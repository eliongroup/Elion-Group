import type { Metadata } from "next";
import { GroupIntro, Hero, LeadershipQuote, ValuesPillars } from "@/components/sections/Home";
import { DivisionRows, StepsLine } from "@/components/sections/Business";
import { InvestTeaser } from "@/components/sections/Investment";
import { CtaBand } from "@/components/sections/Shared";
import { LatestArticles } from "@/components/blog/LatestArticles";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    absoluteTitle: true,
  });
}

/**
 * Home tells the group's story in order: who we are → our three businesses →
 * how they connect → how investors take part → what guides us → leadership.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const flow = dict.businesses.flow;
  return (
    <>
      <Hero t={dict.home.hero} locale={locale} />
      <GroupIntro t={dict.home.intro} />
      <DivisionRows
        index={dict.home.businesses.index}
        label={dict.home.businesses.label}
        title={dict.home.businesses.title}
        intro={dict.home.businesses.intro}
        divisions={dict.divisions}
        status={dict.common.status}
        locale={locale}
        explore={dict.businesses.list.explore}
        footerLink={{ href: localizedPath(locale, "/businesses"), label: dict.home.businesses.all }}
      />
      <StepsLine index="03" label={flow.label} title={flow.title} intro={flow.intro} steps={flow.steps} id="home-flow" />
      <InvestTeaser t={dict.home.invest} locale={locale} />
      <ValuesPillars
        index={dict.home.values.index}
        label={dict.home.values.label}
        title={dict.home.values.title}
        values={dict.values}
      />
      <LeadershipQuote t={dict.home.quote} />
      <LatestArticles t={dict.blog} locale={locale} />
      <CtaBand t={dict.ctaBand} locale={locale} />
      <WebsiteJsonLd />
    </>
  );
}
