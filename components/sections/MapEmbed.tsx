"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Click-to-load map: no third-party request or cookie until the visitor
 * asks for the map, which keeps the page fast and consent-friendly.
 */
export function MapEmbed({
  t,
  src,
  href,
  address,
  preview,
}: {
  t: Dictionary["contact"]["map"];
  src: string;
  href: string;
  address: string;
  preview: ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep sm:aspect-[16/9] lg:aspect-[16/7]">
      {loaded ? (
        <iframe
          title={t.iframeTitle}
          src={src}
          className="absolute inset-0 size-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          {preview}
          <div className="absolute inset-0 bg-ink/55" aria-hidden />
          <div className="on-dark absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory">
            <span className="gold-rule !w-12" aria-hidden />
            <p className="mt-6 max-w-2xl font-serif text-xl leading-snug md:text-3xl">{address}</p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="label mt-8 inline-flex min-h-[3.25rem] cursor-pointer items-center border border-ivory/70 px-8 text-[0.75rem] text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
            >
              {t.load}
            </button>
            <p className="mt-5 max-w-sm text-[0.8125rem] text-ivory/80">{t.notice}</p>
          </div>
        </>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`label absolute bottom-0 inline-flex min-h-11 items-center bg-white px-4 text-ink ltr:right-0 rtl:left-0 ${loaded ? "" : "sr-only focus:not-sr-only"}`}
      >
        {t.open}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
