import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { readJson } from "./storage";
import type { Post, TeamMember } from "./types";

/**
 * Public reads are cached and tagged; admin actions call updateTag("team") or
 * updateTag("posts") after every change, so the site updates straight away.
 * Admin pages use the uncached read* functions to always see the latest data.
 */
export const TEAM_TAG = "team";
export const POSTS_TAG = "posts";

export const readTeam = () => readJson<TeamMember[]>("team", []);
export const readPosts = () => readJson<Post[]>("posts", []);

export async function getVisibleTeam(): Promise<TeamMember[]> {
  "use cache";
  cacheTag(TEAM_TAG);
  cacheLife("days");
  return (await readTeam()).filter((m) => m.visible);
}

const newestFirst = (a: Post, b: Post) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.updatedAt.localeCompare(a.updatedAt));

export async function getPublishedPosts(): Promise<Post[]> {
  "use cache";
  cacheTag(POSTS_TAG);
  cacheLife("days");
  return (await readPosts()).filter((p) => p.status === "published").sort(newestFirst);
}

export async function getPublishedPost(slug: string): Promise<Post | undefined> {
  return (await getPublishedPosts()).find((p) => p.slug === slug);
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(newestFirst);
}

/** Rough reading time at 220 words per minute. */
export function readingMinutes(body: string): number {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
}

export function formatDate(date: string, locale = "en-GB"): string {
  const d = new Date(`${date}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
