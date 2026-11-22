"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { en } from "@/dictionaries/en";
import { site } from "@/content/site";
import { readContactForm, validateContact, type ContactErrors } from "@/lib/validation";
import { rateLimited } from "@/lib/rate-limit";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: ContactErrors }
  | { status: "rate" }
  | { status: "error" };

const MIN_FILL_MS = 2500;

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Spam traps: a hidden field humans never fill, and a minimum fill time.
  const trap = String(form.get("company_website") ?? "");
  const started = Number(form.get("started_at") ?? 0);
  if (trap || (started && Date.now() - started < MIN_FILL_MS)) {
    return { status: "success" }; // silently discard
  }

  const values = readContactForm(form);
  // Subjects are validated against the canonical (English) list; option values are always English.
  const errors = validateContact(values, en.contact.form.subjects);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "rate" };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "ELION GROUP <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set — message logged instead:", values);
      return { status: "success" };
    }
    console.error("[contact] Email service is not configured.");
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: values.email,
      subject: `[${site.name}] ${values.subject} — ${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone || "—"}`,
        `Subject: ${values.subject}`,
        "",
        values.message,
        "",
        `— Sent from the ${site.name} website contact form. Privacy consent given.`,
      ].join("\n"),
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return { status: "error" };
  }
}
