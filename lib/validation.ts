/** Contact form validation, shared by the client form and the server action. */

export type ContactField = "name" | "email" | "phone" | "subject" | "message" | "consent";
export type ContactValues = Record<Exclude<ContactField, "consent">, string> & { consent: boolean };
export type ContactErrors = Partial<Record<ContactField, true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ()\-.]{6,20}$/;

export const LIMITS = { name: 120, email: 200, phone: 30, subject: 60, message: 4000 } as const;

export function readContactForm(form: FormData): ContactValues {
  const get = (key: string) => String(form.get(key) ?? "").trim();
  return {
    name: get("name").slice(0, LIMITS.name),
    email: get("email").slice(0, LIMITS.email),
    phone: get("phone").slice(0, LIMITS.phone),
    subject: get("subject").slice(0, LIMITS.subject),
    message: get("message").slice(0, LIMITS.message),
    consent: form.get("consent") === "on",
  };
}

export function validateContact(values: ContactValues, subjects: readonly string[]): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.length < 2) errors.name = true;
  if (!EMAIL.test(values.email)) errors.email = true;
  if (values.phone && !PHONE.test(values.phone)) errors.phone = true;
  if (!subjects.includes(values.subject)) errors.subject = true;
  if (values.message.length < 20) errors.message = true;
  if (!values.consent) errors.consent = true;
  return errors;
}
