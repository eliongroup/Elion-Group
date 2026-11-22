"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import type { HeaderContact, NavLink } from "./Header";
import backdrop from "@/public/images/hero-tbilisi.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

/** Full-screen mobile menu. Loaded on demand, so Motion stays out of the initial bundle. */
export default function MobileMenu({
  open,
  onClose,
  links,
  nav,
  contact,
  locale,
  logoSrc,
  matches,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  nav: Dictionary["nav"];
  contact: HeaderContact;
  locale: string;
  logoSrc: string | null;
  matches: (match: string) => boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const id = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-close]")?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus?.();
    };
  }, [open, onKey]);

  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : 0.12 + i * 0.06 },
  });

  const quick = [
    { href: `tel:${contact.phoneHref}`, label: nav.call, icon: <PhoneGlyph /> },
    { href: `mailto:${contact.email}`, label: nav.email, icon: <MailGlyph /> },
    { href: contact.whatsapp, label: "WhatsApp", icon: <WhatsAppIcon size={18} />, external: true },
  ];

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <m.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={nav.menuTitle}
            className="on-dark fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-ink text-ivory lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.65, ease }}
          >
            {/* Atmosphere: the city at dusk, very low behind the menu */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
              <Image src={backdrop} alt={nav.menuImageAlt} fill sizes="100vw" quality={50} className="object-cover object-[70%_50%] opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
            </div>

            <div className="container-lux flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-ivory/10">
              <Link href={localizedPath(locale, "/")} onClick={onClose} aria-label={`ELION GROUP — ${nav.home}`}>
                <Wordmark logoSrc={logoSrc} tone="light" />
              </Link>
              <button
                type="button"
                data-close
                onClick={onClose}
                className="group -me-2 inline-flex min-h-11 cursor-pointer items-center gap-3 ps-3 pe-2"
              >
                <span className="label text-[0.6875rem] text-ivory/80">{nav.close}</span>
                <span className="flex size-11 items-center justify-center rounded-full border border-ivory/30 transition-colors duration-300 group-hover:border-gold-light">
                  <CloseIcon size={18} className="transition-transform duration-500 group-hover:rotate-90" />
                </span>
              </button>
            </div>

            <nav aria-label={nav.mainLabel} className="container-lux flex-1 pt-8 pb-6">
              <ul>
                {links.map((link, i) => {
                  const current = matches(link.match);
                  return (
                    <m.li key={link.href} className="border-b border-ivory/10" {...item(i)}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={current ? "page" : undefined}
                        className="group flex min-h-11 items-center gap-5 py-[1.1rem]"
                      >
                        <span className={`w-6 text-[0.6875rem] tabular-nums tracking-[0.2em] ${current ? "text-gold-light" : "text-ivory/45"}`} aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`title-roman flex-1 text-[1.875rem] leading-none transition-colors duration-300 sm:text-[2.5rem] ${
                            current ? "text-gold-light" : "text-ivory group-hover:text-gold-light"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ArrowIcon
                          size={18}
                          className={`transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${current ? "text-gold-light" : "text-ivory/40"}`}
                        />
                      </Link>
                      {link.children && (
                        <ul className="-mt-1 mb-5 ms-11 space-y-0.5 border-s border-gold/40 ps-5">
                          {link.children.map((c) => {
                            const active = matches(c.match);
                            return (
                              <li key={c.href} className={c.sub ? "ms-4" : undefined}>
                                <Link
                                  href={c.href}
                                  onClick={onClose}
                                  aria-current={active ? "page" : undefined}
                                  className={`flex min-h-11 items-center justify-between gap-4 font-serif transition-colors duration-300 ${c.sub ? "text-[0.9375rem]" : "text-[1.125rem]"} ${
                                    active ? "text-gold-light" : "text-ivory/80 hover:text-gold-light"
                                  }`}
                                >
                                  {c.label}
                                  <ArrowIcon size={14} className="text-ivory/30" />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </m.li>
                  );
                })}
              </ul>

              <m.div {...item(links.length)} className="mt-10">
                <Link
                  href={`${localizedPath(locale, "/contact")}#enquiry`}
                  onClick={onClose}
                  className="btn-shine group label flex min-h-[3.5rem] w-full items-center justify-center gap-3 text-[0.75rem] text-ink [background:var(--gradient-gold-btn)] active:scale-[0.99]"
                >
                  {nav.menuCta}
                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
                <ul className="mt-3 grid grid-cols-3 gap-3">
                  {quick.map((q) => (
                    <li key={q.label}>
                      <a
                        href={q.href}
                        {...(q.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex min-h-[3.75rem] flex-col items-center justify-center gap-1.5 border border-ivory/15 text-ivory/85 transition-colors duration-300 hover:border-gold-light hover:text-ivory"
                      >
                        <span aria-hidden className="text-gold-light">
                          {q.icon}
                        </span>
                        <span className="text-[0.6875rem] tracking-[0.14em] uppercase">{q.label}</span>
                        {q.external && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </m.div>
            </nav>

            <m.div {...item(links.length + 1)} className="container-lux shrink-0 border-t border-ivory/10 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <p className="label text-gold-light">{nav.office}</p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ivory/70">{contact.address}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}
