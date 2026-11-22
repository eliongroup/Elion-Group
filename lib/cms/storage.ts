import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Where admin content lives.
 *
 * - Production: Supabase Storage. Set SUPABASE_URL, SUPABASE_SECRET_KEY
 *   (the service_role key: server only, never expose it) and optionally
 *   SUPABASE_BUCKET (default "cms", a public bucket).
 *   Team and articles are stored as cms/<name>.json, images as media/<uuid>.<ext>.
 * - Local development without those variables: files in ./.data (JSON) and
 *   ./.data/media (images), served through /api/media/<file>.
 */
const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || "cms";
const hasSupabase = () => Boolean(SUPABASE_URL && SUPABASE_KEY);

const DATA_DIR = join(process.cwd(), ".data");
const MEDIA_DIR = join(DATA_DIR, "media");

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("Storage is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY in the environment variables.");
  }
}

/** On Vercel the file system is read-only, so writing needs Supabase. */
function assertWritable() {
  if (!hasSupabase() && process.env.VERCEL) throw new StorageNotConfiguredError();
}

export function storageStatus(): "supabase" | "local" | "missing" {
  if (hasSupabase()) return "supabase";
  return process.env.VERCEL ? "missing" : "local";
}

/* ---------------------------------------------------------------- Supabase */

const authHeaders = () => ({ apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}` });
const objectUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`;
const publicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

async function upload(path: string, body: BodyInit, contentType: string, cacheSeconds: number): Promise<void> {
  const res = await fetch(objectUrl(path), {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": contentType, "x-upsert": "true", "cache-control": `max-age=${cacheSeconds}` },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase upload failed (${res.status}): ${await res.text()}`);
}

/* ---------------------------------------------------------------- JSON */

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  try {
    if (hasSupabase()) {
      // Authenticated read straight from storage (not the CDN), so a save is visible immediately.
      const res = await fetch(objectUrl(`cms/${name}.json`), { headers: authHeaders(), cache: "no-store" });
      if (!res.ok) return fallback;
      return (await res.json()) as T;
    }
    return JSON.parse(await readFile(join(DATA_DIR, `${name}.json`), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(name: string, data: unknown): Promise<void> {
  assertWritable();
  const body = JSON.stringify(data, null, 2);
  if (hasSupabase()) {
    await upload(`cms/${name}.json`, body, "application/json", 0);
    return;
  }
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(join(DATA_DIR, `${name}.json`), body, "utf8");
}

/* ---------------------------------------------------------------- Images */

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Stores an uploaded image and returns its public URL. Validate type and size before calling. */
export async function saveImage(file: File): Promise<string> {
  assertWritable();
  const name = `${randomUUID()}.${IMAGE_TYPES[file.type]}`;
  if (hasSupabase()) {
    // Names are unique, so images can be cached for a year.
    await upload(`media/${name}`, file, file.type, 31536000);
    return publicUrl(`media/${name}`);
  }
  await mkdir(MEDIA_DIR, { recursive: true });
  await writeFile(join(MEDIA_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/media/${name}`;
}

export async function deleteImage(url: string): Promise<void> {
  if (!url) return;
  try {
    const prefix = hasSupabase() ? publicUrl("") : null;
    if (prefix && url.startsWith(prefix)) {
      await fetch(objectUrl(url.slice(prefix.length)), { method: "DELETE", headers: authHeaders(), cache: "no-store" });
    } else if (url.startsWith("/api/media/")) {
      await unlink(join(MEDIA_DIR, url.slice("/api/media/".length).replace(/[^\w.-]/g, "")));
    }
  } catch {
    // Already gone: nothing to do.
  }
}

/** Local development only: reads an image saved by saveImage. */
export async function readLocalImage(file: string): Promise<Buffer | null> {
  const safe = file.replace(/[^\w.-]/g, "");
  if (!safe || safe !== file) return null;
  try {
    return await readFile(join(MEDIA_DIR, safe));
  } catch {
    return null;
  }
}
