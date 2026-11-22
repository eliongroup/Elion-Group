"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useId, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/[locale]/contact/actions";
import { ArrowIcon } from "@/components/ui/Icons";
import { readContactForm, validateContact, type ContactErrors, type ContactField } from "@/lib/validation";
import type { Dictionary } from "@/dictionaries/en";

type T = Dictionary["contact"]["form"];

type FormProps = {
  t: T;
  /** Canonical subject values (English) submitted to the server, paired with translated labels. */
  subjectValues: readonly string[];
  privacyHref: string;
  email: string;
};

/** Remounting through `key` gives "Send another message" a clean slate. */
export function ContactForm(props: FormProps) {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({ t, subjectValues, privacyHref, email, onReset }: FormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [subject, setSubject] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const serverErrors = state.status === "invalid" ? state.errors : {};
  const errors: ContactErrors = { ...serverErrors, ...clientErrors };
  const hasErrors = Object.keys(errors).length > 0;

  // Preselect a subject from ?subject=… (links on brand cards) and stamp the start time.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("subject");
    // Browser-only values (URL and clock) are read once after hydration.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (requested && subjectValues.includes(requested)) setSubject(requested);
    setStartedAt(Date.now());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [subjectValues]);

  useEffect(() => {
    if (state.status === "success" || state.status === "error" || state.status === "rate") {
      resultRef.current?.focus();
    } else if (state.status === "invalid") {
      summaryRef.current?.focus();
    }
  }, [state]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const values = readContactForm(new FormData(event.currentTarget));
    const found = validateContact(values, subjectValues);
    event.preventDefault();
    setClientErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Submit manually so React does not reset the fields (kept on error for retry).
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  function revalidateField(field: ContactField) {
    if (!errors[field] || !formRef.current) return;
    const found = validateContact(readContactForm(new FormData(formRef.current)), subjectValues);
    setClientErrors((prev) => {
      const next = { ...prev };
      if (!found[field]) delete next[field];
      return next;
    });
  }

  if (state.status === "success" && !pending) {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border-s-2 border-success bg-ivory p-10 outline-none md:p-14">
        <span className="gold-rule" aria-hidden />
        <p className="mt-8 font-serif text-h2 text-ink">{t.successTitle}</p>
        <p className="mt-4 max-w-md text-muted">{t.successText}</p>
        <button
          type="button"
          onClick={onReset}
          className="label group mt-10 inline-flex min-h-11 cursor-pointer items-center gap-3 text-ink"
        >
          <span className="link-draw link-draw-static">{t.sendAnother}</span>
          <ArrowIcon />
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="relative" aria-describedby="form-required-note">
      <h2 className="sr-only">{t.title}</h2>

      {(state.status === "error" || state.status === "rate") && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mb-10 border-s-2 border-error bg-ivory p-6 outline-none">
          <p className="font-semibold text-error">{t.errorTitle}</p>
          <p className="mt-2 text-sm text-muted">
            {state.status === "rate" ? (
              t.errors.rate
            ) : (
              <>
                {t.errorText}{" "}
                <a className="text-ink underline decoration-gold underline-offset-4" href={`mailto:${email}`}>
                  {email}
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        className={`outline-none ${hasErrors ? "mb-10 border-s-2 border-error bg-ivory p-6" : ""}`}
      >
        {hasErrors && (
          <>
            <p className="font-semibold text-error">{t.errorsSummary}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {(Object.keys(errors) as ContactField[]).map((field) => (
                <li key={field}>
                  <a href={`#field-${field}`} className="text-ink underline decoration-error underline-offset-4">
                    {t.errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p id="form-required-note" className="label mb-8 text-muted">
        * {t.required}
      </p>

      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
        <Field id="name" label={t.name} required error={errors.name ? t.errors.name : undefined}>
          {(p) => (
            <input {...p} type="text" name="name" autoComplete="name" maxLength={120} onBlur={() => revalidateField("name")} />
          )}
        </Field>
        <Field id="email" label={t.email} required error={errors.email ? t.errors.email : undefined}>
          {(p) => (
            <input
              {...p}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              maxLength={200}
              onBlur={() => revalidateField("email")}
            />
          )}
        </Field>
        <Field id="phone" label={t.phone} hint={t.optional} error={errors.phone ? t.errors.phone : undefined}>
          {(p) => (
            <input
              {...p}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              onBlur={() => revalidateField("phone")}
            />
          )}
        </Field>
        <Field id="subject" label={t.subject} required error={errors.subject ? t.errors.subject : undefined}>
          {(p) => (
            <div className="relative">
              <select
                {...p}
                name="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  revalidateField("subject");
                }}
                className={`${p.className} cursor-pointer appearance-none pe-8`}
              >
                <option value="" disabled>
                  {t.subjectPlaceholder}
                </option>
                {subjectValues.map((value, i) => (
                  <option key={value} value={value}>
                    {t.subjects[i] ?? value}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-ink ltr:right-0 rtl:left-0"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          )}
        </Field>
        <div className="md:col-span-2">
          <Field id="message" label={t.message} required error={errors.message ? t.errors.message : undefined}>
            {(p) => (
              <textarea
                {...p}
                name="message"
                rows={5}
                maxLength={4000}
                onBlur={() => revalidateField("message")}
                className={`${p.className} resize-y`}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">{t.honeypot}</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="started_at" value={startedAt || ""} />

      <div className="mt-10">
        <div className="flex items-start gap-4">
          <input
            id="field-consent"
            name="consent"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "field-consent-error" : undefined}
            onChange={() => revalidateField("consent")}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-ink"
          />
          <label htmlFor="field-consent" className="text-sm text-muted">
            {t.consentBefore}{" "}
            <Link href={privacyHref} className="text-ink underline decoration-gold underline-offset-4">
              {t.consentLink}
            </Link>{" "}
            {t.consentAfter} <span aria-hidden>*</span>
          </label>
        </div>
        {errors.consent && (
          <p id="field-consent-error" className="mt-2 text-sm text-error">
            {t.errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group label mt-12 inline-flex min-h-[3.25rem] w-full cursor-pointer items-center justify-center gap-3 bg-ink px-10 text-[0.75rem] text-ivory transition-colors duration-300 hover:bg-ink-soft active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? (
          <>
            <span aria-hidden className="size-4 animate-spin rounded-full border border-ivory/30 border-t-gold-light" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submit}
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </>
        )}
      </button>
      <p className="sr-only" aria-live="polite">
        {pending ? t.submitting : ""}
      </p>
    </form>
  );
}

type FieldRenderProps = {
  id: string;
  className: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  "aria-required"?: true;
};

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: FieldRenderProps) => React.ReactNode;
}) {
  const fieldId = `field-${id}`;
  const errorId = `${fieldId}-error`;
  const hintId = useId();
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={fieldId} className="label flex items-baseline gap-2 text-ink">
        {label}
        {required && <span aria-hidden>*</span>}
        {hint && (
          <span id={hintId} className="normal-case tracking-normal text-muted">
            ({hint})
          </span>
        )}
      </label>
      {children({
        id: fieldId,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required ? true : undefined,
        className: `mt-3 block w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-base text-ink transition-colors duration-200 placeholder:text-muted focus:border-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${
          error ? "border-error" : "border-line-strong hover:border-ink"
        }`,
      })}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
