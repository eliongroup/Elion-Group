import type { Metadata, Viewport } from "next";
import { Inter, Marcellus } from "next/font/google";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { fullAddress, site, whatsappHref } from "@/content/site";
import { getDictionary } from "@/lib/dictionary";
import { dirFor, hasLocale, locales, localizedPath } from "@/lib/i18n";

/** Display: Marcellus — classical Roman letterforms for headings. */
const serif = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

/** Text: Inter — neutral, highly legible body and UI type. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Uses /public/logo.svg automatically once it is added. */
const logoSrc = existsSync(join(process.cwd(), "public", "logo.svg")) ? "/logo.svg" : null;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.home.title, template: `%s — ${site.name}` },
    description: dict.meta.siteDescription,
    applicationName: site.name,
    authors: [{ name: site.name }],
    formatDetection: { telephone: false, email: false, address: false },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dirFor(locale)} data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JS runs (content stays visible without JS). */}
        <script dangerouslySetInnerHTML={{ __html: "var d=document.documentElement;d.classList.add('js');if(document.cookie.indexOf('elion_consent=')>-1)d.classList.add('has-consent')" }} />
      </head>
      <body className="min-h-screen bg-white" suppressHydrationWarning>
        <Header
          locale={locale}
          nav={dict.nav}
          divisions={dict.divisions.map((d) => ({ slug: d.slug, name: d.name, kicker: d.kicker }))}
          markets={dict.markets.map((m) => ({ slug: m.slug, name: m.name, hubs: m.hubs, region: m.region }))}
          logoSrc={logoSrc}
          contact={{ email: site.email, phone: site.phoneDisplay, phoneHref: site.phoneHref, address: fullAddress, whatsapp: whatsappHref }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer dict={dict} locale={locale} logoSrc={logoSrc} />
        <CookieBanner t={dict.cookies} policyHref={localizedPath(locale, "/legal/cookies")} />
        <RevealObserver />
        <OrganizationJsonLd dict={dict} />
      </body>
    </html>
  );
}
