"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, passwordMatches, requireAdmin, startSession, adminConfigured } from "@/lib/admin/auth";
import { POSTS_TAG, TEAM_TAG, readPosts, readTeam } from "@/lib/cms/data";
import { IMAGE_TYPES, MAX_IMAGE_BYTES, StorageNotConfiguredError, deleteImage, saveImage, writeJson } from "@/lib/cms/storage";
import type { Post, PostStatus, TeamMember } from "@/lib/cms/types";
import { rateLimited } from "@/lib/rate-limit";
import { slugify } from "@/lib/cms/slug";

export type FormState = { error?: string; fields?: Record<string, string> };

const text = (form: FormData, key: string, max: number) => String(form.get(key) ?? "").trim().slice(0, max);

function uploadedImage(form: FormData, key: string): File | null | string {
  const file = form.get(key);
  if (!(file instanceof File) || file.size === 0) return null;
  if (!IMAGE_TYPES[file.type]) return "Images must be JPG, PNG, WebP or AVIF.";
  if (file.size > MAX_IMAGE_BYTES) return "Images must be 5 MB or smaller.";
  return file;
}

function storageMessage(error: unknown): string {
  if (error instanceof StorageNotConfiguredError) return error.message;
  console.error("[admin] save failed", error);
  return "Saving failed. Please try again.";
}

/* ---------------------------------------------------------------- Login */

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  if (!adminConfigured()) return { error: "The admin panel is not configured yet. Set ADMIN_PASSWORD in the environment." };
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(`admin-login:${ip}`)) return { error: "Too many attempts. Please wait 10 minutes and try again." };
  if (!passwordMatches(String(form.get("password") ?? ""))) return { error: "Incorrect password." };
  await startSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

/* ---------------------------------------------------------------- Team */

export async function saveMember(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(form, "id", 64);
  const fields = {
    name: text(form, "name", 120),
    role: text(form, "role", 120),
    bio: text(form, "bio", 1000),
  };
  if (!fields.name || !fields.role) return { error: "Name and role are required.", fields };
  const photo = uploadedImage(form, "photo");
  if (typeof photo === "string") return { error: photo, fields };

  try {
    const team = await readTeam();
    const existing = team.find((m) => m.id === id);
    let photoUrl = existing?.photoUrl ?? "";
    if (photo || form.get("removePhoto") === "on") {
      await deleteImage(photoUrl);
      photoUrl = photo ? await saveImage(photo) : "";
    }
    const member: TeamMember = { id: existing?.id ?? randomUUID(), ...fields, photoUrl, visible: form.get("visible") === "on" };
    await writeJson("team", existing ? team.map((m) => (m.id === id ? member : m)) : [...team, member]);
  } catch (error) {
    return { error: storageMessage(error), fields };
  }
  updateTag(TEAM_TAG);
  redirect("/admin/team?saved=1");
}

export async function moveMember(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get("id"));
  const step = form.get("direction") === "up" ? -1 : 1;
  const team = await readTeam();
  const i = team.findIndex((m) => m.id === id);
  const j = i + step;
  if (i < 0 || j < 0 || j >= team.length) return;
  [team[i], team[j]] = [team[j], team[i]];
  await writeJson("team", team);
  updateTag(TEAM_TAG);
}

export async function deleteMember(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get("id"));
  const team = await readTeam();
  const member = team.find((m) => m.id === id);
  if (!member) return;
  await writeJson("team", team.filter((m) => m.id !== id));
  await deleteImage(member.photoUrl);
  updateTag(TEAM_TAG);
  redirect("/admin/team?deleted=1");
}

/* ---------------------------------------------------------------- Blog */

export async function savePost(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(form, "id", 64);
  const fields = {
    title: text(form, "title", 160),
    slug: text(form, "slug", 80),
    excerpt: text(form, "excerpt", 320),
    body: text(form, "body", 60000),
    category: text(form, "category", 60),
    author: text(form, "author", 120),
    date: text(form, "date", 10),
    coverAlt: text(form, "coverAlt", 200),
    status: form.get("status") === "published" ? "published" : "draft",
  };
  if (!fields.title) return { error: "A title is required.", fields };
  if (!fields.body) return { error: "The article text is required.", fields };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) return { error: "Please choose a publication date.", fields };
  const slug = slugify(fields.slug || fields.title);
  if (!slug) return { error: "The web address (slug) needs at least one letter or number.", fields };
  const cover = uploadedImage(form, "cover");
  if (typeof cover === "string") return { error: cover, fields };

  try {
    const posts = await readPosts();
    if (posts.some((p) => p.slug === slug && p.id !== id)) {
      return { error: `Another article already uses the address "/blog/${slug}". Choose a different slug.`, fields };
    }
    const existing = posts.find((p) => p.id === id);
    let coverUrl = existing?.coverUrl ?? "";
    if (cover || form.get("removeCover") === "on") {
      await deleteImage(coverUrl);
      coverUrl = cover ? await saveImage(cover) : "";
    }
    if (coverUrl && !fields.coverAlt) {
      if (cover) await deleteImage(coverUrl);
      return { error: "Please describe the cover image (alt text) for screen readers and search engines.", fields };
    }
    const post: Post = {
      id: existing?.id ?? randomUUID(),
      slug,
      title: fields.title,
      excerpt: fields.excerpt,
      body: fields.body,
      category: fields.category,
      author: fields.author,
      date: fields.date,
      coverUrl,
      coverAlt: coverUrl ? fields.coverAlt : "",
      status: fields.status as PostStatus,
      updatedAt: new Date().toISOString(),
    };
    await writeJson("posts", existing ? posts.map((p) => (p.id === id ? post : p)) : [...posts, post]);
  } catch (error) {
    return { error: storageMessage(error), fields };
  }
  updateTag(POSTS_TAG);
  redirect("/admin/blog?saved=1");
}

export async function deletePost(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get("id"));
  const posts = await readPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  await writeJson("posts", posts.filter((p) => p.id !== id));
  await deleteImage(post.coverUrl);
  updateTag(POSTS_TAG);
  redirect("/admin/blog?deleted=1");
}
