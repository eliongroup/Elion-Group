import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { StaticImageData } from "next/image";
import { NarrativeIntro, NextChapter, ServicesGrid } from "@/components/sections/Business";
import { MarketElion, MarketOwnership, OtherMarkets, marketHref } from "@/components/sections/Investment";
import { CtaBand, PageHero } from "@/components/sections/Shared";
import { en } from "@/dictionaries/en";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import georgia from "@/public/images/invest-tbilisi.jpg";
import uae from "@/public/images/market-uae.jpg";
import qatar from "@/public/images/market-qatar.jpg";
import saudi from "@/public/images/market-saudi-arabia.jpg";
import oman from "@/public/images/market-oman.jpg";
import uk from "@/public/images/market-uk.jpg";
import portugal from "@/public/images/market-portugal.jpg";
import france from "@/public/images/market-france.jpg";
import zanzibar from "@/public/images/market-zanzibar.jpg";

const heroes: Record<string, { image: StaticImageData; position: string }> = {
  georgia: { image: georgia, position: "60% 50%" },
  uae: { image: uae, position: "40% 50%" },
  qatar: { image: qatar, position: "55% 50%" },
  "saudi-arabia": { image: saudi, position: "40% 50%" },
  oman: { image: oman, position: "45% 50%" },
  "united-kingdom": { image: uk, position: "50% 50%" },
  portugal: { image: portugal, position: "50% 50%" },
  france: { image: france, position: "55% 50%" },
  zanzibar: { image: zanzibar, position: "50% 60%" },
};

export async function generateStaticParams() {
  return en.markets.map((m) => ({ market: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/investment-guide/[market]">): Promise<Metadata> {
  const { locale, market } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const m = dict.markets.find((x) => x.slug === market);
  if (!m) return {};
  return pageMetadata({
    locale,
    path: `/investment-guide/${market}`,
    title: `Investing in ${m.name}`,
    description: `${m.tagline} ELION GROUP’s guide to real estate ownership, residency and investing in ${m.name}.`,
  });
}

export default async function MarketPage({ params }: PageProps<"/[locale]/investment-guide/[market]">) {
  const { locale, market } = await params;
  const dict = await getDictionary();
  const i = dict.markets.findIndex((x) => x.slug === market);
  if (i < 0) notFound();
  const m = dict.markets[i];
  const t = dict.marketPage;
  const next = dict.markets[(i + 1) % dict.markets.length];
  const hero = heroes[m.slug];

  return (
    <>
      <PageHero
        label={`${t.label} · ${m.hubs}`}
        title={m.name}
        text={m.tagline}
        image={hero.image}
        imageAlt={m.imageAlt}
        position={hero.position}
      />
      <NarrativeIntro index="01" label={t.overview} lede={m.overview.lede} body={m.overview.body} />
      <ServicesGrid index="02" label={t.highlights} title={t.highlightsTitle} items={m.highlights} id="market-highlights" />
      <MarketOwnership market={m} t={t} />
      <MarketElion market={m} t={t} locale={locale} />
      <OtherMarkets markets={dict.markets.filter((x) => x.slug !== m.slug)} t={t} locale={locale} />
      <NextChapter label={dict.divisionPage.next} kicker={next.hubs} title={next.name} href={marketHref(locale, next.slug)} />
      <CtaBand
        t={{ ...dict.ctaBand, button: t.speak }}
        locale={locale}
        href={`${localizedPath(locale, "/contact")}?subject=Investment#enquiry`}
      />
    </>
  );
}
