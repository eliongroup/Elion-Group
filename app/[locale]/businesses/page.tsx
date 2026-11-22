import type { Metadata } from "next";
import { DivisionRows, NarrativeIntro, NextChapter, StepsLine } from "@/components/sections/Business";
import { CtaBand, PageHero } from "@/components/sections/Shared";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import lobby from "@/public/images/office-lobby.jpg";

export async function generateMetadata({ params }: PageProps<"/[locale]/businesses">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/businesses",
    title: dict.businesses.meta.title,
    description: dict.businesses.meta.description,
  });
}

export default async function BusinessesPage({ params }: PageProps<"/[locale]/businesses">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const t = dict.businesses;
  return (
    <>
      <PageHero label={t.hero.label} title={t.hero.title} text={t.hero.text} image={lobby} imageAlt={t.hero.imageAlt} position="55% 50%" />
      <NarrativeIntro index={t.intro.index} label={t.intro.label} lede={t.intro.lede} body={t.intro.body} />
      <DivisionRows
        index={t.list.index}
        label={t.list.label}
        divisions={dict.divisions}
        status={dict.common.status}
        locale={locale}
        explore={t.list.explore}
      />
      <StepsLine index={t.flow.index} label={t.flow.label} title={t.flow.title} intro={t.flow.intro} steps={t.flow.steps} id="businesses-flow" />
      <NextChapter
        label={dict.nextChapter.label}
        kicker={dict.investment.hero.label}
        title={dict.investment.hero.title}
        href={localizedPath(locale, "/investment-guide")}
      />
      <CtaBand t={dict.ctaBand} locale={locale} />
    </>
  );
}
