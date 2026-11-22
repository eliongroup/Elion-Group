import { ButtonLink, TextLink } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";

export function NotFoundView({ t, locale }: { t: Dictionary["notFound"]; locale: string }) {
  return (
    <section className="flex min-h-[100svh] items-center bg-ivory pt-[var(--header-h)]">
      <div className="container-lux py-24 text-center">
        <p className="label text-muted">{t.label}</p>
        <div className="relative mx-auto mt-10 w-fit" aria-hidden>
          <span className="block font-serif text-[9rem] leading-none text-ink md:text-[14rem]">404</span>
          <span className="absolute inset-x-[-10%] top-[54%] h-px" style={{ background: "var(--gradient-gold)" }} />
        </div>
        <h1 className="mx-auto mt-12 max-w-xl text-h2 text-ink">{t.title}</h1>
        <p className="mx-auto mt-6 max-w-md text-muted">{t.text}</p>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <ButtonLink href={localizedPath(locale, "/")} variant="secondary">
            {t.home}
          </ButtonLink>
          <TextLink href={localizedPath(locale, "/contact")}>{t.contact}</TextLink>
        </div>
      </div>
    </section>
  );
}
