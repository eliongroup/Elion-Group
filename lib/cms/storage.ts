import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { del, get, put } from "@vercel/blob";

/**
 * Where admin content lives.
 *
 * - Production (Vercel): Vercel Blob. Connect a Blob store to the project and
 *   BLOB_READ_WRITE_TOKEN is set automatically.
 * - Local development (no token): files in ./.data (JSON) and ./.data/media (images),
 *   served through /api/media/<file>.
 */
const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const DATA_DIR = join(process.cwd(), ".data");
const MEDIA_DIR = join(DATA_DIR, "media");

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("Storage is not configured. Connect a Vercel Blob store to the project (BLOB_READ_WRITE_TOKEN).");
  }
}

/** On Vercel the file system is read-only, so writing needs Blob. */
function assertWritable() {
  if (!hasBlob() && process.env.VERCEL) throw new StorageNotConfiguredError();
}

export function storageStatus(): "blob" | "local" | "missing" {
  if (hasBlob()) return "blob";
  return process.env.VERCEL ? "missing" : "local";
}

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  try {
    if (hasBlob()) {
      // useCache: false reads from origin, so a save is visible immediately.
      const result = await get(`cms/${name}.json`, { access: "public", useCache: false });
      if (!result || result.statusCode !== 200) return fallback;
      return JSON.parse(await new Response(result.stream).text()) as T;
    }
    return JSON.parse(await readFile(join(DATA_DIR, `${name}.json`), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(name: string, data: unknown): Promise<void> {
  assertWritable();
  const body = JSON.stringify(data, null, 2);
  if (hasBlob()) {
    await put(`cms/${name}.json`, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });
    return;
  }
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(join(DATA_DIR, `${name}.json`), body, "utf8");
}

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
  if (hasBlob()) {
    const blob = await put(`cms/media/${name}`, file, { access: "public", contentType: file.type, addRandomSuffix: false });
    return blob.url;
  }
  await mkdir(MEDIA_DIR, { recursive: true });
  await writeFile(join(MEDIA_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/media/${name}`;
}

export async function deleteImage(url: string): Promise<void> {
  if (!url) return;
  try {
    if (url.startsWith("https://") && hasBlob()) await del(url);
    else if (url.startsWith("/api/media/")) await unlink(join(MEDIA_DIR, url.slice("/api/media/".length).replace(/[^\w.-]/g, "")));
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
