import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink, Label, SectionHeading, TextLink } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import facadeImage from "@/public/images/hero-facade.jpg";
import investImage from "@/public/images/invest-tbilisi.jpg";

type Inv = Dictionary["investment"];
type Market = Dictionary["markets"][number];

export const marketHref = (locale: string, slug: string) => localizedPath(locale, `/investment-guide/${slug}`);

/** The five markets as image cards, followed by an at-a-glance comparison table. */
export function MarketsSection({ t, markets, locale }: { t: Inv["markets"]; markets: Market[]; locale: string }) {
  const [first, ...rest] = markets;
  return (
    <section id="markets" aria-labelledby="markets-title" className="section-y bg-ivory">
      <div className="container-lux">
        <SectionHeading index={t.index} label={t.label} title={t.title} intro={t.intro} id="markets-title" />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-24">
          <li className="md:col-span-2" data-reveal>
            <MarketCard market={first} locale={locale} read={t.read} large />
          </li>
          {rest.map((m, i) => (
            <li key={m.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <MarketCard market={m} locale={locale} read={t.read} />
            </li>
          ))}
        </ul>

        <div className="mt-20 lg:mt-28" data-reveal>
          <h3 className="label flex items-center gap-4 text-muted">
            <span className="gold-rule" aria-hidden />
            {t.compareTitle}
          </h3>
          <div className="mt-6 overflow-x-auto border border-line bg-white">
            <table className="w-full min-w-[46rem] border-collapse text-[0.9375rem]">
              <thead>
                <tr className="border-b border-line">
                  {[t.compare.market, t.compare.hubs, t.compare.ownership, t.compare.residency, t.compare.role].map((h) => (
                    <th key={h} scope="col" className="label px-5 py-4 text-start text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={m.slug} className="border-b border-line transition-colors last:border-b-0 hover:bg-ivory">
                    <th scope="row" className="px-5 py-4 text-start font-normal">
                      <Link href={marketHref(locale, m.slug)} className="link-draw font-serif text-[1.0625rem] text-ink">
                        {m.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-muted">{m.hubs}</td>
                    <td className="px-5 py-4 text-ink">{m.ownership}</td>
                    <td className="px-5 py-4 text-muted">{m.residency}</td>
                    <td className="px-5 py-4">
                      <span className={`label ${m.slug === "georgia" ? "text-gold-ink" : "text-muted"}`}>{m.role}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">{t.compareNote}</p>
        </div>
      </div>
    </section>
  );
}

function MarketCard({ market, locale, read, large }: { market: Market; locale: string; read: string; large?: boolean }) {
  return (
    <Link
      href={marketHref(locale, market.slug)}
      className={`group on-dark relative isolate flex overflow-hidden bg-ink text-ivory ${
        large ? "min-h-[26rem] lg:min-h-[32rem]" : "min-h-[22rem] lg:min-h-[26rem]"
      }`}
    >
      <Image
        src={market.image}
        alt={market.imageAlt}
        fill
        sizes={large ? "(min-width: 1440px) 1360px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        quality={72}
        className="-z-20 object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.04]"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      <span className="mt-auto flex w-full items-end justify-between gap-6 p-6 md:p-8 lg:p-10">
        <span className="min-w-0">
          <span className="label flex items-center gap-3 text-gold-light">
            <span className="size-1.5 rotate-45 bg-gold-light" aria-hidden />
            {market.role} · {market.hubs}
          </span>
          <span
            className={`title-roman mt-4 block leading-[1.05] text-ivory ${
              large ? "text-[clamp(2rem,1.2rem+3vw,3.75rem)]" : "text-[clamp(1.625rem,1.2rem+1.4vw,2.375rem)]"
            }`}
          >
            {market.name}
          </span>
          <span className={`mt-3 block max-w-xl text-ivory/80 ${large ? "" : "text-[0.9375rem]"}`}>{market.tagline}</span>
        </span>
        <span
          aria-hidden
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-colors duration-300 group-hover:border-gold-light group-hover:bg-ivory group-hover:text-ink sm:flex"
        >
          <ArrowIcon size={18} />
        </span>
      </span>
      <span className="sr-only">{read}</span>
    </Link>
  );
}

/** Market page: how ownership works, with the residency note. */
export function MarketOwnership({ market, t }: { market: Market; t: Dictionary["marketPage"] }) {
  return (
    <section aria-labelledby="ownership-title" className="section-y bg-white">
      <div className="container-lux grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5" data-reveal>
          <Label index="03">{t.ownership}</Label>
          <h2 id="ownership-title" className="mt-8 text-h2 text-ink">
            {t.ownershipTitle}
          </h2>
          <ul className="mt-10 border-t border-line">
            {market.ownershipPoints.map((p) => (
              <li key={p} className="flex gap-5 border-b border-line py-5 text-ink">
                <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep" data-reveal="image">
            <Image src={market.image} alt={market.imageAlt} fill sizes="(min-width: 1024px) 45vw, 100vw" quality={72} className="object-cover" />
          </div>
          <div className="border-s-2 border-gold bg-ivory px-6 py-6">
            <p className="label text-gold-ink">{t.residency}</p>
            <p className="mt-3 text-muted">{market.residencyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Market page: Elion's role in this market, plus the general-information notice. */
export function MarketElion({ market, t, locale }: { market: Market; t: Dictionary["marketPage"]; locale: string }) {
  return (
    <section aria-labelledby="elion-title" className="section-y on-dark bg-ink text-ivory">
      <div className="container-lux grid gap-y-10 lg:grid-cols-12 lg:gap-x-6" data-reveal>
        <div className="lg:col-span-4">
          <Label index="04" tone="light">
            {t.elion}
          </Label>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="elion-title" className="text-h2 text-ivory">
            {t.elionTitle}
          </h2>
          <p className="mt-6 font-serif text-[1.25rem] leading-relaxed text-ivory/90 md:text-[1.5rem]">{market.elion}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={`${localizedPath(locale, "/contact")}?subject=Investment#enquiry`}>{t.speak}</ButtonLink>
            <TextLink href={localizedPath(locale, "/investment-guide")} tone="light">
              {t.back}
            </TextLink>
          </div>
          <p className="mt-12 border-t border-ivory/15 pt-6 text-sm text-ivory/60">{t.advice}</p>
        </div>
      </div>
    </section>
  );
}

/** Market page: links to the other four markets. */
export function OtherMarkets({ markets, t, locale }: { markets: Market[]; t: Dictionary["marketPage"]; locale: string }) {
  return (
    <section aria-labelledby="others-title" className="section-y bg-ivory">
      <div className="container-lux">
        <SectionHeading index="05" label={t.others} title={t.othersTitle} id="others-title" />
        <ul className="mt-14 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {markets.map((m) => (
            <li key={m.slug} data-reveal>
              <Link href={marketHref(locale, m.slug)} className="group block">
                <span className="zoom-frame relative block aspect-[4/3] bg-ivory-deep">
                  <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 1024px) 25vw, 50vw" quality={70} className="object-cover" />
                </span>
                <span className="label mt-5 block text-muted">{m.hubs}</span>
                <span className="mt-2 flex items-center justify-between gap-4 font-serif text-[1.375rem] text-ink">
                  <span className="link-draw">{m.name}</span>
                  <ArrowIcon size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ForDevelopers({ t, locale }: { t: Inv["developers"]; locale: string }) {
  return (
    <section aria-labelledby="dev-title" className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[44rem]" data-reveal="image">
          <Image
            src={facadeImage}
            alt={t.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={75}
            placeholder="blur"
            className="object-cover object-[65%_50%]"
          />
        </div>
        <div className="flex items-center px-[var(--gutter)] py-20 lg:px-16 xl:px-24">
          <div className="max-w-lg" data-reveal>
            <Label index={t.index}>{t.label}</Label>
            <h2 id="dev-title" className="mt-8 text-h2 text-ink">
              {t.title}
            </h2>
            <p className="mt-6 text-muted">{t.lede}</p>
            <ul className="mt-10 border-t border-line">
              {t.points.map((point) => (
                <li key={point} className="flex gap-5 border-b border-line py-4 text-ink">
                  <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={`${localizedPath(locale, "/contact")}?subject=${encodeURIComponent("Developer partnership")}#enquiry`}
              variant="secondary"
              className="mt-10"
            >
              {t.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ t, notice, disclaimerLink, locale }: { t: Inv["faq"]; notice: string; disclaimerLink: string; locale: string }) {
  return (
    <section aria-labelledby="faq-title" className="section-y bg-ivory">
      <div className="container-lux grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4" data-reveal>
          <Label index={t.index}>{t.label}</Label>
          <h2 id="faq-title" className="mt-8 text-h2 text-ink">
            {t.title}
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-line">
            {t.items.map((item, i) => (
              <details key={item.q} className="group border-b border-line" open={i === 0}>
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-6 font-serif text-[1.1875rem] text-ink md:text-[1.375rem] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-gold-ink transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <div role="note" className="mt-12 border-s-2 border-gold bg-white px-6 py-5">
            <p className="text-sm text-muted">{notice}</p>
            <Link
              href={localizedPath(locale, "/legal/disclaimer")}
              className="label mt-3 inline-flex min-h-11 items-center text-ink underline decoration-gold underline-offset-4"
            >
              {disclaimerLink}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Home-page teaser that leads into the full Investment Guide. */
export function InvestTeaser({ t, locale }: { t: Dictionary["home"]["invest"]; locale: string }) {
  return (
    <section aria-labelledby="invest-teaser" className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-[var(--gutter)] py-20 lg:order-1 lg:px-16 xl:px-24">
          <div className="max-w-lg" data-reveal>
            <Label index={t.index}>{t.label}</Label>
            <h2 id="invest-teaser" className="mt-8 text-h2 text-ink">
              {t.title}
            </h2>
            <p className="mt-6 text-muted">{t.text}</p>
            <p className="mt-5 border-s-2 border-gold ps-4 text-[0.9375rem] text-ink">{t.how}</p>
            <ul className="mt-10 space-y-3">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-4 text-ink">
                  <span aria-hidden className="size-1.5 shrink-0 rotate-45 bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <TextLink href={localizedPath(locale, "/investment-guide")} className="mt-10">
              {t.link}
            </TextLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[42rem]" data-reveal="image">
          <Image
            src={investImage}
            alt={t.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={75}
            placeholder="blur"
            className="object-cover object-[70%_50%]"
          />
        </div>
      </div>
    </section>
  );
}
