import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import { Label, SectionHeading, TextLink } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";

type Division = Dictionary["divisions"][number];
type Status = Dictionary["common"]["status"];

export const divisionHref = (locale: string, slug: string) => localizedPath(locale, `/businesses/${slug}`);

/** Two-column narrative: a large lede on one side, connected body paragraphs on the other. */
export function NarrativeIntro({
  index,
  label,
  lede,
  body,
  tone = "white",
}: {
  index: string;
  label: string;
  lede: string;
  body: string[];
  tone?: "white" | "ivory";
}) {
  return (
    <section aria-label={label} className={`section-y ${tone === "ivory" ? "bg-ivory" : "bg-white"}`}>
      <div className="container-lux grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6" data-reveal>
          <Label index={index} as="h2">
            {label}
          </Label>
          <p className="mt-10 font-serif text-[1.5rem] leading-[1.45] text-ink md:text-[2rem]">{lede}</p>
        </div>
        <div className="space-y-6 text-muted lg:col-span-5 lg:col-start-8 lg:pt-24" data-reveal>
          {body.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:float-start first-letter:me-3 first-letter:font-serif first-letter:text-[3.25rem] first-letter:leading-[0.9] first-letter:text-gold-ink" : undefined}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The three businesses as alternating editorial rows. */
export function DivisionRows({
  index,
  label,
  title,
  intro,
  divisions,
  status,
  locale,
  explore,
  footerLink,
  tone = "ivory",
}: {
  index: string;
  label: string;
  title?: string;
  intro?: string;
  divisions: Division[];
  status: Status;
  locale: string;
  explore: string;
  footerLink?: { href: string; label: string };
  tone?: "white" | "ivory";
}) {
  return (
    <section id="businesses" aria-labelledby="businesses-title" className={`section-y ${tone === "ivory" ? "bg-ivory" : "bg-white"}`}>
      <div className="container-lux">
        <SectionHeading index={index} label={label} title={title ?? label} intro={intro} id="businesses-title" />

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {divisions.map((d, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={d.slug} className="group grid items-center gap-y-8 lg:grid-cols-12 lg:gap-x-6" data-reveal>
                <Link
                  href={divisionHref(locale, d.slug)}
                  tabIndex={-1}
                  aria-hidden
                  data-reveal="image"
                  className={`zoom-frame relative block aspect-[4/3] bg-ivory-deep lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                >
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                  <span className="absolute top-5 inline-flex items-center gap-2 bg-white/90 px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.22em] text-ink uppercase backdrop-blur-sm ltr:left-5 rtl:right-5">
                    <span className={`size-1.5 rotate-45 ${d.status === "active" ? "bg-gold" : "bg-line-strong"}`} />
                    {status[d.status]}
                  </span>
                </Link>
                <div className={`lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                  <p className="text-[2.25rem] font-extralight leading-none tabular-nums text-gold-ink" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="label mt-6 text-muted">{d.kicker}</p>
                  <h3 className="mt-3 text-h2 text-ink">
                    <Link href={divisionHref(locale, d.slug)} className="link-draw">
                      {d.name}
                    </Link>
                  </h3>
                  <p className="mt-5 text-muted">{d.summary}</p>
                  {"proof" in d && d.proof && (
                    <dl className="mt-5 border-s-2 border-gold ps-4">
                      <dt className="label text-[0.625rem] text-gold-ink">{d.proof.label}</dt>
                      <dd className="mt-1.5 text-ink">{d.proof.value}</dd>
                    </dl>
                  )}
                  <p className="mt-5 flex gap-4 border-t border-line pt-5 font-serif text-[1.0625rem] text-ink">
                    <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-gold" />
                    {d.bridge}
                  </p>
                  <TextLink href={divisionHref(locale, d.slug)} className="mt-6">
                    {explore} {d.name}
                  </TextLink>
                </div>
              </article>
            );
          })}
        </div>

        {footerLink && (
          <div className="mt-20 flex justify-center lg:mt-28" data-reveal>
            <TextLink href={footerLink.href}>{footerLink.label}</TextLink>
          </div>
        )}
      </div>
    </section>
  );
}

/** Numbered steps joined by a gold line: the "connected" visual used across the site. */
export function StepsLine({
  index,
  label,
  title,
  intro,
  steps,
  tone = "dark",
  id,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  steps: { title: string; text: string }[];
  tone?: "dark" | "light";
  id: string;
}) {
  const dark = tone === "dark";
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <section aria-labelledby={id} className={`section-y ${dark ? "on-dark bg-ink text-ivory" : "bg-white"}`}>
      <div className="container-lux">
        <SectionHeading index={index} label={label} title={title} intro={intro} id={id} tone={dark ? "light" : "dark"} />
        <ol className={`relative mt-16 grid gap-10 lg:mt-24 lg:gap-6 ${cols}`}>
          {/* connecting line (desktop: horizontal, mobile: vertical) */}
          <span aria-hidden className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/60 to-transparent start-[1.25rem] lg:hidden" />
          <span aria-hidden className="absolute inset-x-0 top-[1.25rem] hidden h-px bg-gradient-to-r from-gold via-gold/70 to-gold/10 lg:block" />
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative ps-16 lg:ps-0 lg:pe-6"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden
                className={`absolute top-0 flex size-10 items-center justify-center rounded-full border border-gold text-[0.8125rem] tabular-nums start-0 lg:relative ${
                  dark ? "bg-ink text-gold-light" : "bg-white text-gold-ink"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`text-h3 lg:mt-8 ${dark ? "text-ivory" : "text-ink"}`}>{s.title}</h3>
              <p className={`mt-3 ${dark ? "text-ivory/75" : "text-muted"}`}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Four numbered capabilities in a hairline grid. */
export function ServicesGrid({
  index,
  label,
  title,
  items,
  id,
}: {
  index: string;
  label: string;
  title: string;
  items: { title: string; text: string }[];
  id: string;
}) {
  return (
    <section aria-labelledby={id} className="section-y bg-ivory">
      <div className="container-lux">
        <SectionHeading index={index} label={label} title={title} id={id} />
        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`border-b border-line py-10 sm:px-8 lg:border-b-0 ${i % 2 === 1 ? "sm:border-s" : "sm:ps-0"} ${
                i > 0 ? "lg:border-s lg:ps-8" : ""
              }`}
            >
              <span className="text-[1.75rem] font-light tabular-nums text-gold-ink" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-h3 text-ink">{item.title}</h3>
              <p className="mt-4 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** How a business connects to the other two, with links to them. */
export function WithinGroup({
  index,
  label,
  title,
  text,
  others,
  locale,
  explore,
}: {
  index: string;
  label: string;
  title: string;
  text: string;
  others: Division[];
  locale: string;
  explore: string;
}) {
  return (
    <section aria-labelledby="within-title" className="section-y bg-white">
      <div className="container-lux">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6" data-reveal>
          <div className="lg:col-span-4">
            <Label index={index}>{label}</Label>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="within-title" className="text-h2 text-ink">
              {title}
            </h2>
            <p className="mt-6 font-serif text-[1.25rem] leading-relaxed text-ink md:text-[1.5rem]">{text}</p>
          </div>
        </div>
        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20">
          {others.map((d) => (
            <li key={d.slug} data-reveal>
              <Link href={divisionHref(locale, d.slug)} className="group flex h-full gap-6 border border-line bg-ivory p-4 transition-colors duration-300 hover:border-gold sm:p-5">
                <span className="zoom-frame relative block aspect-square w-28 shrink-0 bg-ivory-deep sm:w-36">
                  <Image src={d.image} alt={d.imageAlt} fill sizes="144px" quality={70} className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-col justify-center">
                  <span className="label text-muted">{d.kicker}</span>
                  <span className="mt-2 font-serif text-[1.375rem] text-ink">{d.name}</span>
                  <span className="mt-2 text-[0.9375rem] text-muted">{d.bridge}</span>
                  <span className="label mt-4 inline-flex items-center gap-3 text-ink">
                    {explore}
                    <ArrowIcon size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Full-width link that carries the reader to the next page of the story. */
export function NextChapter({ label, title, kicker, href }: { label: string; title: string; kicker?: string; href: string }) {
  return (
    <section aria-label={`${label}: ${title}`} className="border-t border-line bg-ivory">
      <Link href={href} className="group container-lux flex items-center justify-between gap-8 py-16 md:py-24">
        <span className="min-w-0">
          <span className="label flex items-center gap-4 text-muted">
            <span className="gold-rule" aria-hidden />
            {label}
            {kicker && <span className="hidden text-gold-ink sm:inline">· {kicker}</span>}
          </span>
          <span className="title-roman mt-6 block text-[clamp(1.75rem,1rem+3vw,3.75rem)] leading-[1.08] text-ink">
            <span className="link-draw">{title}</span>
          </span>
        </span>
        <span
          aria-hidden
          className="flex size-14 shrink-0 items-center justify-center rounded-full border border-ink/30 transition-colors duration-300 group-hover:border-gold group-hover:bg-ink group-hover:text-ivory md:size-20"
        >
          <ArrowIcon size={22} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
