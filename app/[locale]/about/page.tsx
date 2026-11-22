import type { Metadata } from "next";
import { GroupStructure, LeadershipTeaser, MissionVision, Story, Timeline, ValuesList } from "@/components/sections/About";
import { CtaBand, PageHero } from "@/components/sections/Shared";
import { NextChapter } from "@/components/sections/Business";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import aboutHero from "@/public/images/tbilisi-sunset.jpg";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: dict.meta.about.title, description: dict.meta.about.description });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const t = dict.about;
  return (
    <>
      <PageHero
        label={t.hero.label}
        title={t.hero.title}
        text={t.hero.text}
        image={aboutHero}
        imageAlt={t.hero.imageAlt}
        position="62% 50%"
      />
      <Story t={t.story} />
      <MissionVision t={t.missionVision} />
      <ValuesList t={t.values} values={dict.values} />
      <GroupStructure
        t={t.structure}
        nodes={[
          ...dict.divisions.map((d) => ({ slug: d.slug, name: d.name, kicker: d.kicker, status: d.status })),
          { slug: "ventures", name: dict.futureVentures.name, status: dict.futureVentures.status },
        ]}
        status={dict.common.status}
      />
      <LeadershipTeaser t={t.leadership} locale={locale} />
      <Timeline t={t.timeline} />
      <NextChapter
        label={dict.nextChapter.label}
        kicker={dict.nav.businesses}
        title={dict.businesses.hero.title}
        href={localizedPath(locale, "/businesses")}
      />
      <CtaBand t={dict.ctaBand} locale={locale} />
    </>
  );
}
