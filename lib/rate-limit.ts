/**
 * Minimal in-memory rate limit: 5 messages per IP per 10 minutes.
 * On serverless platforms memory is per instance, so this is a soft guard.
 * For stricter limits use a shared store (e.g. Upstash Redis / Vercel KV).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

export function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX;
}
