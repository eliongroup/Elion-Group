import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { CookieSettingsButton } from "@/components/consent/CookieBanner";
import { fullAddress, site } from "@/content/site";
import { legalSlugs } from "@/content/legal/en";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";

export function Footer({ dict, locale, logoSrc }: { dict: Dictionary; locale: string; logoSrc: string | null }) {
  const t = dict.footer;
  const groupLinks = [
    { href: localizedPath(locale, "/"), label: dict.nav.home },
    { href: localizedPath(locale, "/about"), label: dict.nav.story },
    { href: localizedPath(locale, "/team"), label: dict.nav.team },
    { href: localizedPath(locale, "/businesses"), label: dict.nav.ourBusinesses },
    { href: localizedPath(locale, "/investment-guide"), label: dict.nav.investmentGuide },
    { href: localizedPath(locale, "/blog"), label: dict.nav.blog },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];
  const linkClass = "link-draw text-ivory/80 transition-colors hover:text-ivory";

  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className="container-lux pt-20 pb-10 lg:pt-32">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-2 lg:col-span-5">
            <Link href={localizedPath(locale, "/")} className="inline-flex" aria-label="ELION GROUP">
              <Wordmark logoSrc={logoSrc} tone="light" size="lg" />
            </Link>
            <p className="mt-8 max-w-sm font-serif text-xl leading-snug text-ivory/85">{t.statement}</p>
          </div>

          <nav aria-label={t.group} className="lg:col-span-2 lg:col-start-7">
            <h2 className="label text-gold-light">{t.group}</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              {groupLinks.map((l) => (
                <li key={l.href}>
                  <Link className={linkClass} href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.legal} className="lg:col-span-2">
            <h2 className="label text-gold-light">{t.legal}</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              {legalSlugs.map((slug) => (
                <li key={slug}>
                  <Link className={linkClass} href={localizedPath(locale, `/legal/${slug}`)}>
                    {dict.legalNav[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-2">
            <h2 className="label text-gold-light">{t.contact}</h2>
            <address className="mt-6 space-y-3 text-[0.9375rem] not-italic text-ivory/80">
              <p>{fullAddress}</p>
              <p>
                <a className={linkClass} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
              <p>
                <a className={linkClass} href={`tel:${site.phoneHref}`}>
                  {site.phoneDisplay}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 h-px w-full lg:mt-24" style={{ background: "var(--gradient-gold)" }} aria-hidden />
        <div className="mt-8 flex flex-col gap-4 text-[0.8125rem] text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.foundedYear} {site.legalName} · {t.registered} · {t.id} {site.registrationNumber}
          </p>
          <CookieSettingsButton label={t.cookieSettings} />
        </div>
      </div>
    </footer>
  );
}
