import type { Metadata } from "next";
import { Careers, Culture, GroupFunctions, LeadershipProfiles, TeamIntro } from "@/components/sections/Team";
import { CtaBand, PageHero } from "@/components/sections/Shared";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { getVisibleTeam } from "@/lib/cms/data";
import teamImage from "@/public/images/team-boardroom.jpg";

export async function generateMetadata({ params }: PageProps<"/[locale]/team">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/team", title: dict.meta.team.title, description: dict.meta.team.description });
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const t = dict.team;
  const members = await getVisibleTeam();
  return (
    <>
      <PageHero
        label={t.hero.label}
        title={t.hero.title}
        text={t.hero.text}
        image={teamImage}
        imageAlt={t.hero.imageAlt}
        position="55% 50%"
      />
      <TeamIntro t={t.intro} />
      <LeadershipProfiles t={t.leadership} members={members} />
      <GroupFunctions t={t.functions} />
      <Culture t={t.culture} />
      <Careers t={t.careers} locale={locale} />
      <CtaBand t={dict.ctaBand} locale={locale} />
    </>
  );
}
