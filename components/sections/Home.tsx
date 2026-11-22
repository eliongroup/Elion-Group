import Image from "next/image";
import { ValueGlyph } from "@/components/ui/Icons";
import { ButtonLink, Label, TextLink } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import heroImage from "@/public/images/hero-tbilisi.jpg";
import lobbyImage from "@/public/images/office-lobby.jpg";
import portrait from "@/public/images/leadership-tbilisi.jpg";

export function Hero({ t, locale }: { t: Dictionary["home"]["hero"]; locale: string }) {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-ivory">
      {/* Phones: the photograph is a tall band at the top that fades into charcoal, so the text sits on a clean ground.
          Tablet and up: full-bleed photograph with the text on the left. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[62svh] overflow-hidden md:inset-0 md:h-auto">
        <Image
          src={heroImage}
          alt={t.imageAlt}
          fill
          priority
          sizes="(orientation: portrait) 75vh, 100vw"
          quality={75}
          placeholder="blur"
          className="slow-zoom object-cover object-[96%_35%] md:object-[62%_50%]"
        />
        {/* Phones: fade the photograph into the charcoal ground */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.5)_0%,transparent_28%,rgb(26_26_26/0.55)_62%,#1a1a1a_92%,#1a1a1a_100%)] md:hidden" />
        {/* Tablet and up: a deep wash on the left where the text sits, fading out before the tower */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent to-75% md:block rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/10 to-black/35 md:block" />
      </div>

      <div className="container-lux pt-[38svh] md:pt-32">
        {/* Text column is capped so the headline never reaches the tower */}
        <div className="max-w-[min(100%,40rem)]">
          <p className="label hero-rise flex items-center gap-4 text-ivory/90" style={{ animationDelay: "100ms" }}>
            <span className="gold-rule" aria-hidden />
            {t.eyebrow}
          </p>
          <h1
            className="title-roman hero-rise mt-5 text-[clamp(2.625rem,min(1.5rem+4vw,9.5svh),5rem)] leading-[1.02] text-ivory md:mt-6"
            style={{ animationDelay: "200ms" }}
          >
            {t.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={`block ${i === 1 ? "bg-[linear-gradient(100deg,#e8d2a2_0%,#c8a66a_55%,#b08a4e_100%)] bg-clip-text text-transparent" : ""}`}
              >
                {word}
              </span>
            ))}
          </h1>
          <p
            className="hero-rise mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ivory/80 md:mt-6 md:text-lead md:text-ivory/85"
            style={{ animationDelay: "350ms" }}
          >
            {t.subtitle}
          </p>
          <div
            className="hero-rise mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-9 sm:gap-y-5 md:mt-8"
            style={{ animationDelay: "500ms" }}
          >
            <ButtonLink href={`${localizedPath(locale, "/")}#group`} variant="secondary-light" className="w-full sm:w-auto">
              {t.cta}
            </ButtonLink>
            <TextLink href={localizedPath(locale, "/investment-guide")} tone="light" className="self-center sm:self-auto">
              {t.secondary}
            </TextLink>
          </div>
        </div>

        {/* Key facts bar: two compact columns on phones (the third, longest fact from tablet up) */}
        <dl
          className="hero-rise mt-10 grid grid-cols-2 gap-y-5 border-t border-ivory/20 py-6 sm:grid-cols-3 md:mt-[clamp(2.5rem,7svh,5rem)] md:py-6"
          style={{ animationDelay: "650ms" }}
        >
          {t.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-1.5 ${i > 0 ? "border-s border-ivory/20 ps-5 sm:ps-8" : ""} ${i === 2 ? "hidden sm:flex" : ""}`}
            >
              <dt className="label text-[0.625rem] text-gold-light sm:text-[0.6875rem]">{fact.label}</dt>
              <dd className="font-serif text-base text-ivory sm:text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function GroupIntro({ t }: { t: Dictionary["home"]["intro"] }) {
  return (
    <section id="group" aria-label={t.label} className="section-y bg-white">
      <div className="container-lux">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4" data-reveal>
            <Label index={t.index} as="h2">
              {t.label}
            </Label>
          </div>
          <p
            className="font-serif text-[1.5rem] leading-[1.45] text-ink md:text-[2rem] lg:col-span-7 lg:col-start-6"
            data-reveal
          >
            {t.statement}
          </p>
        </div>

        <div className="relative mt-20 aspect-[4/3] overflow-hidden bg-ivory-deep sm:aspect-[16/8] lg:mt-28" data-reveal="image">
          <Image
            src={lobbyImage}
            alt={t.imageAlt}
            fill
            sizes="(min-width: 1440px) 1360px, 100vw"
            quality={75}
            placeholder="blur"
            className="object-cover"
          />
        </div>

        {t.figures.length > 0 && (
          <dl className="grid border-b border-line sm:grid-cols-3">
            {t.figures.map((f, i) => (
              <div
                key={f.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                className={`flex flex-col-reverse gap-3 pt-10 pb-8 sm:pe-6 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-s sm:ps-8" : ""}`}
              >
                <dt className="label max-w-[16rem] text-muted">{f.label}</dt>
                <dd className="font-serif text-[2.75rem] leading-none tabular-nums text-ink lg:text-[3.75rem]">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export function ValuesPillars({
  index,
  label,
  title,
  values,
}: {
  index: string;
  label: string;
  title: string;
  values: Dictionary["values"];
}) {
  return (
    <section aria-labelledby="values-title" className="section-y bg-white">
      <div className="container-lux">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <Label index={index} className="justify-center">
            {label}
          </Label>
          <h2 id="values-title" className="mt-8 text-h2 text-ink">
            {title}
          </h2>
        </div>

        <ul className="mt-20 grid border-t border-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 lg:border-t-0">
          {values.map((v, i) => (
            <li
              key={v.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`border-b border-line py-12 sm:px-8 lg:border-b-0 lg:px-10 lg:py-4 ${
                i % 2 === 1 ? "sm:border-s" : ""
              } ${i > 0 ? "lg:border-s" : ""} ${i === 0 ? "sm:ps-0 lg:ps-0" : ""}`}
            >
              <ValueGlyph name={v.icon} className="text-gold" />
              <h3 className="mt-8 text-h3 text-ink">{v.title}</h3>
              <p className="mt-4 text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LeadershipQuote({ t }: { t: Dictionary["home"]["quote"] }) {
  return (
    <section aria-label={t.label} className="section-y bg-ivory">
      <div className="container-lux grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5" data-reveal="image">
          <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
            <Image
              src={portrait}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
        <figure className="lg:col-span-6 lg:col-start-7" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <Label as="h2">{t.label}</Label>
          <span aria-hidden className="mt-10 block font-serif text-[6rem] leading-[0.5] text-gold">
            “
          </span>
          <blockquote className="mt-2">
            <p className="font-serif text-[1.5rem] leading-[1.5] text-ink md:text-[1.875rem]">{t.text}</p>
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-5">
            <span className="gold-rule" aria-hidden />
            <span>
              <span className="block font-serif text-xl text-ink">{t.name}</span>
              <span className="label mt-1 block text-muted">{t.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
