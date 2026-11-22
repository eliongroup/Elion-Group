"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { Dictionary } from "@/dictionaries/en";

const COOKIE = "elion_consent";
const OPEN_EVENT = "elion:open-cookie-settings";
const MAX_AGE = 60 * 60 * 24 * 365;

export type Consent = { essential: true; analytics: boolean; v: 1 };

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split("=")[1])) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  const value: Consent = { essential: true, analytics, v: 1 };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("elion:consent", { detail: value }));
}

export function CookieBanner({ t, policyHref }: { t: Dictionary["cookies"]; policyHref: string }) {
  // Rendered in the server HTML so it paints with the page (no late layout/LCP).
  // An inline script hides it before first paint when a choice already exists.
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();
  const analyticsId = useId();

  useEffect(() => {
    const existing = readConsent();
    // Reading a cookie is only possible after hydration, so this sync is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (existing) setVisible(false);
    const open = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  if (!visible) return null;

  const decide = (value: boolean) => {
    writeConsent(value);
    setVisible(false);
    setExpanded(false);
  };

  return (
    <section
      role="region"
      aria-labelledby={titleId}
      data-cookie-banner=""
      data-open={expanded ? "" : undefined}
      className="fixed inset-x-3 bottom-3 z-[55] max-h-[calc(100svh-6rem)] overflow-y-auto border border-line bg-white p-4 shadow-float sm:inset-x-auto sm:bottom-6 sm:max-w-md sm:p-6 ltr:sm:right-6 rtl:sm:left-6"
    >
      <h2 id={titleId} className="label flex items-center gap-3 text-ink">
        <span className="gold-rule !w-6" aria-hidden />
        {t.title}
      </h2>
      <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted sm:mt-4 sm:text-sm">
        <span className="sm:hidden">{t.short}</span>
        <span className="hidden sm:inline">{t.text}</span>{" "}
        <Link href={policyHref} className="text-ink underline decoration-gold underline-offset-4">
          {t.policy}
        </Link>
      </p>

      {expanded && (
        <fieldset className="mt-5 space-y-4 border-t border-line pt-5">
          <legend className="sr-only">{t.dialogLabel}</legend>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-ink">{t.essential}</p>
              <p className="text-[0.8125rem] text-muted">{t.essentialText}</p>
            </div>
            <input type="checkbox" checked disabled aria-label={t.essential} className="mt-1 size-5 accent-ink" />
          </div>
          <div className="flex items-start justify-between gap-6">
            <label htmlFor={analyticsId}>
              <span className="block text-sm font-semibold text-ink">{t.analytics}</span>
              <span className="block text-[0.8125rem] text-muted">{t.analyticsText}</span>
            </label>
            <input
              id={analyticsId}
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 size-5 cursor-pointer accent-ink"
            />
          </div>
        </fieldset>
      )}

      <div className="mt-3.5 grid grid-cols-2 items-center gap-2 sm:mt-6 sm:flex sm:flex-wrap sm:gap-x-3 sm:gap-y-2">
        {expanded ? (
          <button type="button" onClick={() => decide(analytics)} className={`${btn("solid")} col-span-2`}>
            {t.save}
          </button>
        ) : (
          <>
            <button type="button" onClick={() => decide(true)} className={btn("solid")}>
              {t.accept}
            </button>
            <button type="button" onClick={() => decide(false)} className={btn("outline")}>
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="label col-span-2 min-h-9 cursor-pointer justify-self-start px-0 text-[0.625rem] text-ink underline decoration-gold underline-offset-4 sm:min-h-11 sm:px-2 sm:text-[0.6875rem]"
            >
              {t.settings}
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function btn(kind: "solid" | "outline") {
  const base = "label min-h-11 cursor-pointer px-3 text-[0.625rem] transition-colors duration-200 sm:px-5 sm:text-[0.6875rem]";
  return kind === "solid"
    ? `${base} bg-ink text-ivory hover:bg-ink-soft`
    : `${base} border border-ink text-ink hover:bg-ink hover:text-ivory`;
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="link-draw min-h-11 cursor-pointer text-start text-ivory/70 transition-colors hover:text-ivory"
    >
      {label}
    </button>
  );
}
