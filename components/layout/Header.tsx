"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowIcon } from "@/components/ui/Icons";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import storyImg from "@/public/images/tbilisi-sunset.jpg";
import teamImg from "@/public/images/team-boardroom.jpg";
import investImg from "@/public/images/invest-tbilisi.jpg";

export type NavChild = { href: string; label: string; match: string; sub?: boolean };
export type NavLink = { href: string; label: string; match: string; panel?: PanelKey; children?: NavChild[] };
export type HeaderContact = { email: string; phone: string; phoneHref: string; address: string; whatsapp: string };
type PanelKey = "about" | "businesses";
type Market = { slug: string; name: string; hubs: string; region: string };

/** Keeps the dictionary order of regions: Georgia, The Gulf, Europe, Indian Ocean. */
function groupByRegion(markets: Market[]) {
  const groups: { region: string; items: Market[] }[] = [];
  for (const m of markets) {
    const g = groups.find((x) => x.region === m.region);
    if (g) g.items.push(m);
    else groups.push({ region: m.region, items: [m] });
  }
  return groups;
}

type Props = {
  locale: string;
  nav: Dictionary["nav"];
  divisions: { slug: string; name: string; kicker: string }[];
  markets: Market[];
  contact: HeaderContact;
  logoSrc: string | null;
};

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

/** Pages whose first screen is a dark full-bleed image: the header starts transparent. */
const OVERLAY_PREFIXES = ["/about", "/team", "/businesses", "/investment-guide"];

export function Header({ locale, nav, divisions, markets, contact, logoSrc }: Props) {
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname, locale);
  const overlay = basePath === "/" || OVERLAY_PREFIXES.some((p) => basePath === p || basePath.startsWith(`${p}/`));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [panel, setPanel] = useState<PanelKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggles = useRef<Partial<Record<PanelKey, HTMLButtonElement | null>>>({});

  const [hidden, setHidden] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 60);
      // Slide away while reading downwards; return as soon as the reader scrolls up.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 420);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setPanel(null);
  }

  const show = useCallback((key: PanelKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(key);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(null), 160);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggles.current[panel]?.focus();
        setPanel(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel]);

  const p = (path: string) => localizedPath(locale, path);
  const links: NavLink[] = [
    { href: p("/"), label: nav.home, match: "/" },
    {
      href: p("/about"),
      label: nav.about,
      match: "/about",
      panel: "about",
      children: [
        { href: p("/about"), label: nav.story, match: "/about" },
        { href: p("/team"), label: nav.team, match: "/team" },
      ],
    },
    {
      href: p("/businesses"),
      label: nav.ourBusinesses,
      match: "/businesses",
      panel: "businesses",
      children: [
        ...divisions.map((d) => ({ href: p(`/businesses/${d.slug}`), label: d.name, match: `/businesses/${d.slug}` })),
        { href: p("/investment-guide"), label: nav.investmentGuide, match: "/investment-guide" },
        ...markets.map((m) => ({ href: p(`/investment-guide/${m.slug}`), label: m.name, match: `/investment-guide/${m.slug}`, sub: true })),
      ],
    },
    { href: p("/blog"), label: nav.blog, match: "/blog" },
    { href: p("/contact"), label: nav.contact, match: "/contact" },
  ];

  const matches = (match: string) =>
    match === "/" ? basePath === "/" : basePath === match || basePath.startsWith(`${match}/`);
  const isCurrent = (link: NavLink) => matches(link.match) || !!link.children?.some((c) => matches(c.match));

  const transparent = overlay && !scrolled && !panel;
  const tab = (key: PanelKey) => (panel === key ? 0 : -1);

  return (
    <>
      <a
        href="#main"
        className="label fixed top-3 z-[80] -translate-y-24 bg-ink px-5 py-3 text-ivory transition-transform focus:translate-y-0 ltr:left-3 rtl:right-3"
      >
        {nav.skip}
      </a>
      <header
        onMouseLeave={scheduleClose}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-lux ${
          transparent
            ? "border-b border-ivory/10 bg-transparent text-ivory on-dark"
            : "border-b border-line bg-white/95 text-ink shadow-[0_10px_30px_-24px_rgb(26_26_26/0.35)] backdrop-blur-md"
        } ${hidden && !panel && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        {transparent && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/45 to-transparent"
          />
        )}
        {/* Reading progress: a fine gold line along the bottom edge of the header */}
        <span
          ref={progressRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left rtl:origin-right"
          style={{ background: "var(--gradient-gold)", transform: "scaleX(0)" }}
        />
        <div
          className={`container-lux grid grid-cols-[1fr_auto] items-center transition-[height] duration-500 ease-lux lg:grid-cols-[1fr_auto_1fr] ${
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-[var(--header-h)] lg:h-24"
          }`}
        >
          <Link
            href={p("/")}
            className="flex min-h-11 items-center justify-self-start"
            aria-label={`ELION GROUP — ${nav.home}`}
          >
            <Wordmark logoSrc={logoSrc} tone={transparent ? "light" : "dark"} />
          </Link>

          {/* Centred navigation (desktop) */}
          <nav aria-label={nav.mainLabel} className="hidden lg:block">
            <ul className="flex items-center gap-12 xl:gap-14">
              {links.map((link) => {
                const current = isCurrent(link);
                const key = link.panel;
                return key ? (
                  <li key={link.href} className="flex items-center gap-1" onMouseEnter={() => show(key)}>
                    <Link
                      href={link.href}
                      aria-current={basePath === link.match ? "page" : undefined}
                      className={`label link-draw inline-flex min-h-11 items-center text-[0.75rem] tracking-[0.22em] ${current ? "link-draw-active" : ""}`}
                    >
                      {link.label}
                    </Link>
                    <button
                      ref={(el) => {
                        toggles.current[key] = el;
                      }}
                      type="button"
                      aria-expanded={panel === key}
                      aria-controls={`panel-${key}`}
                      aria-label={nav.toggle.replace("{menu}", link.label)}
                      onClick={() => (panel === key ? setPanel(null) : show(key))}
                      className="flex size-8 cursor-pointer items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={14}
                        height={14}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.4}
                        aria-hidden
                        className={`transition-transform duration-300 ${panel === key ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </li>
                ) : (
                  <li key={link.href} onMouseEnter={scheduleClose}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className="label link-draw inline-flex min-h-11 items-center text-[0.75rem] tracking-[0.22em]"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            <Link
              href={`${p("/contact")}#enquiry`}
              className={`group label hidden min-h-11 items-center gap-3 border px-5 text-[0.6875rem] transition-colors duration-300 lg:inline-flex ${
                transparent
                  ? "border-ivory/50 text-ivory hover:border-gold-light hover:bg-ivory hover:text-ink"
                  : "border-ink/80 text-ink hover:bg-ink hover:text-ivory"
              }`}
            >
              {nav.enquire}
              <ArrowIcon size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>

            {/* Menu button (mobile and tablet) */}
            <button
              type="button"
              className="group -me-2 inline-flex min-h-11 cursor-pointer items-center gap-3 ps-3 pe-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                setMenuLoaded(true);
                setOpen(true);
              }}
              onPointerEnter={() => setMenuLoaded(true)}
              onTouchStart={() => setMenuLoaded(true)}
              onFocus={() => setMenuLoaded(true)}
            >
              <span className="label text-[0.6875rem]">{nav.menu}</span>
              <span
                aria-hidden
                className={`flex size-11 flex-col items-center justify-center gap-[6px] rounded-full border transition-colors duration-300 ${
                  transparent ? "border-ivory/40" : "border-ink/25"
                }`}
              >
                <span className="h-px w-5 bg-current transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="h-px w-5 bg-current transition-transform duration-300 group-hover:-translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* ---------- About panel: Our Story · Team ---------- */}
        <Panel id="panel-about" open={panel === "about"} onEnter={() => show("about")}>
          <PanelIntro label={nav.about} text={nav.aboutIntro} href={p("/about")} more={nav.aboutAll} tab={tab("about")} />
          <ul className="col-span-9 grid grid-cols-2 gap-8">
            {[
              { href: p("/about"), label: nav.story, text: nav.storyText, image: storyImg, imageAlt: nav.storyImageAlt, match: "/about" },
              { href: p("/team"), label: nav.team, text: nav.teamText, image: teamImg, imageAlt: nav.teamImageAlt, match: "/team" },
            ].map((c) => (
              <li key={c.href}>
                <ImageLink {...c} active={matches(c.match)} tab={tab("about")} onClick={() => setPanel(null)} />
              </li>
            ))}
          </ul>
        </Panel>

        {/* ---------- Our Businesses panel: businesses · Investment Guide · countries ---------- */}
        <Panel id="panel-businesses" open={panel === "businesses"} onEnter={() => show("businesses")}>
          <PanelIntro
            label={nav.ourBusinesses}
            text={nav.businessesIntro}
            href={p("/businesses")}
            more={nav.businessesAll}
            tab={tab("businesses")}
          />
          <div className="col-span-3 border-e border-line pe-8">
            <p className="label text-muted">{nav.theBusinesses}</p>
            <ul className="mt-4">
              {divisions.map((d) => (
                <li key={d.slug} className="border-b border-line last:border-b-0">
                  <Link
                    href={p(`/businesses/${d.slug}`)}
                    tabIndex={tab("businesses")}
                    onClick={() => setPanel(null)}
                    aria-current={matches(`/businesses/${d.slug}`) ? "page" : undefined}
                    className="group flex min-h-11 flex-col justify-center py-3"
                  >
                    <span className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">{d.kicker}</span>
                    <span className="mt-1 flex items-center justify-between gap-3 font-serif text-[1.125rem] text-ink">
                      <span className={`link-draw ${matches(`/businesses/${d.slug}`) ? "link-draw-active" : ""}`}>{d.name}</span>
                      <ArrowIcon size={13} className="shrink-0 text-gold-ink transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <ImageLink
              href={p("/investment-guide")}
              label={nav.investmentGuide}
              text={nav.investmentText}
              image={investImg}
              imageAlt={nav.investmentImageAlt}
              active={basePath === "/investment-guide"}
              tab={tab("businesses")}
              onClick={() => setPanel(null)}
            />
          </div>
          <div className="col-span-4 border-s border-line ps-8">
            <div>
              <p className="label text-muted">{nav.byCountry}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-5">
                {groupByRegion(markets).map((g) => (
                  <div key={g.region}>
                    <p className="text-[0.625rem] tracking-[0.2em] text-gold-ink uppercase">{g.region}</p>
                    <ul className="mt-1.5">
                      {g.items.map((m) => (
                        <li key={m.slug}>
                          <Link
                            href={p(`/investment-guide/${m.slug}`)}
                            tabIndex={tab("businesses")}
                            onClick={() => setPanel(null)}
                            aria-current={matches(`/investment-guide/${m.slug}`) ? "page" : undefined}
                            className="group flex min-h-9 items-center justify-between gap-3"
                          >
                            <span
                              className={`link-draw font-serif text-[1rem] text-ink ${
                                matches(`/investment-guide/${m.slug}`) ? "link-draw-active" : ""
                              }`}
                            >
                              {m.name}
                            </span>
                            <ArrowIcon size={12} className="shrink-0 text-gold-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </header>

      {menuLoaded && (
        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          links={links}
          nav={nav}
          contact={contact}
          locale={locale}
          logoSrc={logoSrc}
          matches={matches}
        />
      )}
    </>
  );
}

function Panel({ id, open, onEnter, children }: { id: string; open: boolean; onEnter: () => void; children: React.ReactNode }) {
  return (
    <div
      id={id}
      onMouseEnter={onEnter}
      className={`absolute inset-x-0 top-full hidden border-t border-line bg-white text-ink shadow-[0_30px_60px_-30px_rgb(26_26_26/0.35)] transition-[opacity,transform,visibility] duration-300 ease-lux lg:block ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="container-lux grid grid-cols-12 gap-6 py-10">{children}</div>
    </div>
  );
}

function PanelIntro({ label, text, href, more, tab }: { label: string; text: string; href: string; more: string; tab: number }) {
  return (
    <div className="col-span-3 flex flex-col justify-between border-e border-line pe-8">
      <div>
        <p className="label flex items-center gap-3 text-muted">
          <span className="gold-rule !w-6" aria-hidden />
          {label}
        </p>
        <p className="mt-5 font-serif text-[1.3125rem] leading-snug text-ink">{text}</p>
      </div>
      <Link href={href} tabIndex={tab} className="group label mt-8 inline-flex min-h-11 items-center gap-3 text-ink">
        <span className="link-draw link-draw-static">{more}</span>
        <ArrowIcon size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </Link>
    </div>
  );
}

function ImageLink({
  href,
  label,
  text,
  image,
  imageAlt,
  active,
  tab,
  onClick,
}: {
  href: string;
  label: string;
  text: string;
  image: StaticImageData;
  imageAlt: string;
  active: boolean;
  tab: number;
  onClick: () => void;
}) {
  return (
    <Link href={href} tabIndex={tab} aria-current={active ? "page" : undefined} onClick={onClick} className="group block">
      <span className="zoom-frame relative block aspect-[16/10] bg-ivory-deep">
        <Image src={image} alt={imageAlt} fill sizes="360px" quality={60} className="object-cover" />
      </span>
      <span className="mt-4 flex items-center justify-between gap-3 font-serif text-[1.25rem] text-ink">
        <span className={`link-draw ${active ? "link-draw-active" : ""}`}>{label}</span>
        <ArrowIcon size={14} className="shrink-0 text-gold-ink transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </span>
      <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-muted">{text}</span>
    </Link>
  );
}

/**
 * The default locale is rewritten internally (/about -> /en/about), so the
 * server may see the prefixed path while the browser sees the clean one.
 * Always strip the prefix so both render the same header.
 */
function stripLocale(pathname: string, locale: string): string {
  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped.replace(/\/$/, "") || "/";
}
