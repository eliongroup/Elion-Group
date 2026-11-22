import Image from "next/image";
import { Label, SectionHeading, TextLink } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import { ValueGlyph } from "@/components/ui/Icons";
import type { Dictionary } from "@/dictionaries/en";
import storyImage from "@/public/images/office-executive.jpg";

type About = Dictionary["about"];

/** Balanced two-column story: the narrative on one side, a tall photograph on the other. */
export function Story({ t }: { t: About["story"] }) {
  return (
    <section aria-label={t.label} className="section-y bg-white">
      <div className="container-lux grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6" data-reveal>
          <Label index={t.index} as="h2">
            {t.label}
          </Label>
          <p className="mt-10 font-serif text-[1.625rem] leading-[1.4] text-ink md:text-[2.125rem]">{t.lede}</p>
          <span aria-hidden className="mt-10 block h-px w-16" style={{ background: "var(--gradient-gold)" }} />
          <div className="mt-10 grid gap-6 text-[1.0625rem] leading-[1.8] text-muted md:grid-cols-2 md:gap-8">
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal="image" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep lg:aspect-[4/5]">
            <Image
              src={storyImage}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              quality={75}
              placeholder="blur"
              className="object-cover object-[62%_50%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MissionVision({ t }: { t: About["missionVision"] }) {
  const items = [t.mission, t.vision];
  return (
    <section aria-label={t.label} className="section-y bg-ivory">
      <div className="container-lux">
        <div data-reveal>
          <Label index={t.index} as="h2">
            {t.label}
          </Label>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:mt-20">
          {items.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className={`py-10 md:py-4 ${
                i === 0
                  ? "border-b border-gold md:border-b-0 md:pe-12 lg:pe-20"
                  : "md:border-s md:border-gold md:ps-12 lg:ps-20"
              }`}
            >
              <h3 className="label text-gold-ink">{item.title}</h3>
              <p className="mt-6 font-serif text-[1.625rem] leading-[1.4] text-ink md:text-[2rem]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuesList({ t, values }: { t: About["values"]; values: Dictionary["values"] }) {
  return (
    <section aria-labelledby="about-values" className="section-y bg-white">
      <div className="container-lux">
        <SectionHeading index={t.index} label={t.label} title={t.title} id="about-values" />
        <ol className="mt-16 border-t border-line lg:mt-24">
          {values.map((v, i) => (
            <li
              key={v.title}
              data-reveal
              className="grid items-start gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-x-6"
            >
              <span className="label text-gold-ink md:col-span-1" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-6 md:col-span-4">
                <ValueGlyph name={v.icon} size={28} className="shrink-0 text-gold" />
                <h3 className="text-h3 text-ink">{v.title}</h3>
              </div>
              <p className="text-muted md:col-span-6 md:col-start-7">{v.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type StructureNode = { slug: string; name: string; kicker?: string; status: "active" | "soon" | "forming" };

export function GroupStructure({
  t,
  nodes: brands,
  status,
}: {
  t: About["structure"];
  nodes: StructureNode[];
  status: Dictionary["common"]["status"];
}) {
  return (
    <section id="structure" aria-labelledby="structure-title" className="section-y bg-ivory">
      <div className="container-lux">
        <SectionHeading index={t.index} label={t.label} title={t.title} intro={t.intro} id="structure-title" />

        <figure className="mt-20 lg:mt-28" data-reveal>
          <figcaption className="sr-only">
            {t.holding}: {brands.map((b) => `${b.name} (${status[b.status]})`).join(", ")}
          </figcaption>

          {/* Holding node */}
          <div className="flex md:justify-center" aria-hidden>
            <div className="relative border border-gold bg-white px-10 py-7 text-center">
              <span className="block font-serif text-2xl tracking-[0.24em] text-ink">{t.holding}</span>
              <span className="label mt-2 block text-muted">{t.holdingNote}</span>
            </div>
          </div>

          {/* Desktop: vertical stem, horizontal bus, three branches */}
          <div aria-hidden className="relative hidden md:block">
            <div className="mx-auto h-14 w-px bg-gold" />
            <div className="h-px bg-gold" style={{ marginInline: `${50 / brands.length}%` }} />
            <div className="grid" style={{ gridTemplateColumns: `repeat(${brands.length}, minmax(0, 1fr))` }}>
              {brands.map((b) => (
                <div key={b.slug} className="flex flex-col items-center px-2 lg:px-4">
                  <div className="h-14 w-px bg-gold" />
                  <BrandNode name={b.name} kicker={b.kicker} status={status[b.status]} active={b.status === "active"} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical tree on the start side */}
          <div aria-hidden className="ms-6 md:hidden">
            {brands.map((b, i) => (
              <div key={b.slug} className="relative flex items-center ps-6 pt-6">
                {/* stem stops at the last branch */}
                <span
                  className={`absolute start-0 top-0 w-px bg-gold ${
                    i === brands.length - 1 ? "h-[calc(50%+0.75rem)]" : "h-full"
                  }`}
                />
                <span className="absolute start-0 top-[calc(50%+0.75rem)] h-px w-6 bg-gold" />
                <BrandNode name={b.name} kicker={b.kicker} status={status[b.status]} active={b.status === "active"} />
              </div>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}

function BrandNode({ name, kicker, status, active }: { name: string; kicker?: string; status: string; active: boolean }) {
  return (
    <div
      className={`w-full max-w-[18rem] border px-6 py-5 text-center ${active ? "border-line-strong bg-white" : "border-dashed border-line-strong bg-transparent"}`}
    >
      {kicker && <span className="label mb-2 block text-[0.625rem] text-muted">{kicker}</span>}
      <span className="block font-serif text-xl text-ink">{name}</span>
      <span className={`label mt-2 block ${active ? "text-gold-ink" : "text-muted"}`}>{status}</span>
    </div>
  );
}

export function LeadershipTeaser({ t, locale }: { t: About["leadership"]; locale: string }) {
  return (
    <section aria-labelledby="leadership-title" className="section-y bg-white">
      <div className="container-lux grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-6" data-reveal>
        <div className="lg:col-span-4">
          <Label index={t.index}>{t.label}</Label>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="leadership-title" className="text-h2 text-ink">
            {t.title}
          </h2>
          <p className="mt-6 max-w-xl text-muted">{t.teaser}</p>
          <TextLink href={localizedPath(locale, "/team")} className="mt-8">
            {t.link}
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function Timeline({ t }: { t: About["timeline"] }) {
  return (
    <section aria-labelledby="timeline-title" className="section-y bg-ivory">
      <div className="container-lux">
        <SectionHeading index={t.index} label={t.label} title={t.title} id="timeline-title" />
        <ol className="relative mt-20 grid gap-12 border-s border-gold ps-8 md:grid-cols-5 md:gap-6 md:border-s-0 md:border-t md:ps-0 lg:mt-28">
          {t.items.map((item, i) => (
            <li
              key={`${item.year}-${item.title}`}
              className="relative md:pt-12 md:pe-6"
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="absolute top-2 size-2.5 rotate-45 border border-gold bg-ivory -start-[calc(2rem+5px)] md:-top-[5.5px] md:start-0"
              />
              <p className="font-serif text-[2.5rem] leading-none lining-nums text-ink">{item.year}</p>
              <h3 className="label mt-5 text-ink">{item.title}</h3>
              <p className="mt-3 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
