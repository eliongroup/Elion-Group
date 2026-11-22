import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";

/**
 * Single-password admin login.
 * ADMIN_PASSWORD is required. ADMIN_SESSION_SECRET is optional: without it the
 * signing key is derived from the password, so changing the password signs
 * everyone out.
 */
const COOKIE = "elion_admin";
const SESSION_SECONDS = 12 * 60 * 60;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || createHash("sha256").update(`elion-admin:${process.env.ADMIN_PASSWORD ?? ""}`).digest("hex");
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(input, expected!);
}

export async function startSession(): Promise<void> {
  const payload = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isAdmin(): Promise<boolean> {
  // Read the cookie before anything else: it marks the page as per-request,
  // so a "signed out" result is never prerendered at build time.
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value || !adminConfigured()) return false;
  await connection(); // the expiry check below uses the current time
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  return Number(payload) > Date.now() / 1000;
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
