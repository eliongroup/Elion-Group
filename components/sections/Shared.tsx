import Image, { type StaticImageData } from "next/image";
import { ButtonLink, Label } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/content/site";
import loungeImage from "@/public/images/office-lounge.jpg";

/** Closing band: the client lounge on one side, the invitation on charcoal on the other. */
export function CtaBand({ t, locale, href }: { t: Dictionary["ctaBand"]; locale: string; href?: string }) {
  return (
    <section aria-labelledby="cta-title" className="on-dark grid overflow-hidden bg-ink text-ivory lg:grid-cols-2">
      <div className="group relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[38rem]" data-reveal="image">
        <Image
          src={loungeImage}
          alt={t.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={75}
          placeholder="blur"
          className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex min-w-0 items-center px-[var(--gutter)] py-24 lg:px-14 xl:px-24" data-reveal>
        <div className="min-w-0 max-w-lg">
          <Label tone="light">{t.label}</Label>
          {/* Sized to fit the half-width column ("CONVERSATION." is one long word) */}
          <h2 id="cta-title" className="title-roman mt-10 text-[clamp(1.875rem,1rem+2.1vw,3rem)] leading-[1.12] text-ivory">
            {t.title}
          </h2>
          <p className="mt-6 max-w-md text-ivory/80">{t.text}</p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <ButtonLink href={href ?? localizedPath(locale, "/contact")}>{t.button}</ButtonLink>
            {/* Direct line: GCC investors often prefer WhatsApp to a form */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-[3.25rem] items-center justify-center gap-3 border border-ivory/70 px-8 text-[0.75rem] text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
            >
              <WhatsAppIcon />
              {t.whatsapp}
              <span className="sr-only">{t.newTab}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Full-bleed image hero for inner pages, with a short intro line. */
export function PageHero({
  label,
  title,
  text,
  image,
  imageAlt,
  position = "center",
}: {
  label: string;
  title: string;
  text?: string;
  image: StaticImageData;
  imageAlt: string;
  position?: string;
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink text-ivory">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="(orientation: portrait) 75vh, 100vw"
        quality={75}
        placeholder="blur"
        className="slow-zoom -z-20 object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/30 to-transparent rtl:bg-gradient-to-l" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/30" aria-hidden />
      <div className="container-lux pb-16 pt-40 md:pb-24">
        <Label tone="light" className="hero-rise">
          {label}
        </Label>
        <h1 className="title-roman hero-rise mt-8 max-w-4xl text-display text-ivory" style={{ animationDelay: "150ms" }}>
          {title}
        </h1>
        {text && (
          <p className="hero-rise mt-8 max-w-xl text-lead text-ivory/85" style={{ animationDelay: "300ms" }}>
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

/** Split hero: text on ivory, photograph bleeding to the page edge. */
export function SplitHero({
  label,
  title,
  text,
  image,
  imageAlt,
}: {
  label: string;
  title: string;
  text?: string;
  image: StaticImageData;
  imageAlt: string;
}) {
  return (
    <section className="grid bg-ivory lg:min-h-[86svh] lg:grid-cols-2">
      <div className="flex items-end px-[var(--gutter)] pt-[calc(var(--header-h)+4rem)] pb-16 lg:pb-24 xl:ps-[max(var(--gutter),calc((100vw-90rem)/2+var(--gutter)))]">
        <div className="max-w-xl">
          <Label className="hero-rise">{label}</Label>
          <h1 className="title-roman hero-rise mt-8 text-h1 text-ink" style={{ animationDelay: "120ms" }}>
            {title}
          </h1>
          {text && (
            <p className="hero-rise mt-8 text-lead text-muted" style={{ animationDelay: "240ms" }}>
              {text}
            </p>
          )}
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={75}
          placeholder="blur"
          className="slow-zoom object-cover"
        />
      </div>
    </section>
  );
}

/** Quiet text header for utility pages (legal). */
export function TextHeader({ label, title, text, children }: { label: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-ivory pt-[calc(var(--header-h)+5rem)] pb-20 md:pt-[calc(var(--header-h)+8rem)] md:pb-28">
      <div className="container-lux">
        <Label className="hero-rise">{label}</Label>
        <h1 className="title-roman hero-rise mt-8 max-w-4xl text-h1 text-ink" style={{ animationDelay: "120ms" }}>
          {title}
        </h1>
        {text && (
          <p className="hero-rise mt-8 max-w-xl text-lead text-muted" style={{ animationDelay: "240ms" }}>
            {text}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
