import type { Metadata } from "next";
import { NarrativeIntro, NextChapter, StepsLine, divisionHref } from "@/components/sections/Business";
import { Faq, ForDevelopers, MarketsSection } from "@/components/sections/Investment";
import { CtaBand, PageHero } from "@/components/sections/Shared";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import investImage from "@/public/images/invest-tbilisi.jpg";

export async function generateMetadata({ params }: PageProps<"/[locale]/investment-guide">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/investment-guide",
    title: dict.investment.meta.title,
    description: dict.investment.meta.description,
  });
}

export default async function InvestmentGuidePage({ params }: PageProps<"/[locale]/investment-guide">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const t = dict.investment;
  const partners = dict.divisions.find((d) => d.slug === "partners")!;
  return (
    <>
      <PageHero
        label={t.hero.label}
        title={t.hero.title}
        text={t.hero.text}
        image={investImage}
        imageAlt={t.hero.imageAlt}
        position="60% 50%"
      />
      <NarrativeIntro index={t.intro.index} label={t.intro.label} lede={t.intro.lede} body={t.intro.body} />
      <MarketsSection t={t.markets} markets={dict.markets} locale={locale} />
      <StepsLine index={t.steps.index} label={t.steps.label} title={t.steps.title} intro={t.steps.intro} steps={t.steps.items} id="invest-steps" />
      <ForDevelopers t={t.developers} locale={locale} />
      <Faq t={t.faq} notice={t.notice} disclaimerLink={t.disclaimerLink} locale={locale} />
      <NextChapter label={dict.nextChapter.label} kicker={partners.kicker} title={partners.name} href={divisionHref(locale, partners.slug)} />
      <CtaBand
        t={{ ...dict.ctaBand, button: t.cta }}
        locale={locale}
        href={`${localizedPath(locale, "/contact")}?subject=Investment#enquiry`}
      />
    </>
  );
}
