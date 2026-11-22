import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { StaticImageData } from "next/image";
import { NarrativeIntro, NextChapter, ServicesGrid, StepsLine, WithinGroup, divisionHref } from "@/components/sections/Business";
import { CtaBand, PageHero } from "@/components/sections/Shared";
import { en } from "@/dictionaries/en";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import facade from "@/public/images/hero-facade.jpg";
import boardroom from "@/public/images/office-boardroom.jpg";
import atelier from "@/public/images/brand-timepieces-atelier.jpg";

const heroImages: Record<string, { image: StaticImageData; position: string }> = {
  "real-estate": { image: facade, position: "60% 50%" },
  partners: { image: boardroom, position: "50% 50%" },
  timepieces: { image: atelier, position: "45% 50%" },
};

export async function generateStaticParams() {
  return en.divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/businesses/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const d = dict.divisions.find((x) => x.slug === slug);
  if (!d) return {};
  return pageMetadata({ locale, path: `/businesses/${slug}`, title: `${d.name} — ${d.kicker}`, description: d.summary });
}

export default async function DivisionPage({ params }: PageProps<"/[locale]/businesses/[slug]">) {
  const { locale, slug } = await params;
  const dict = await getDictionary();
  const i = dict.divisions.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const d = dict.divisions[i];
  const t = dict.divisionPage;
  const others = dict.divisions.filter((x) => x.slug !== slug);
  const next = dict.divisions[i + 1];
  const hero = heroImages[d.slug];

  return (
    <>
      <PageHero
        label={`${t.label} · ${d.kicker}`}
        title={d.hero.title}
        text={d.hero.text}
        image={hero.image}
        imageAlt={d.hero.imageAlt}
        position={hero.position}
      />
      <NarrativeIntro index="01" label={t.overview} lede={d.overview.lede} body={d.overview.body} />
      <ServicesGrid index="02" label={t.services} title={d.services.title} items={d.services.items} id="division-services" />
      <StepsLine index="03" label={t.process} title={d.process.title} intro={d.process.intro} steps={d.process.steps} id="division-process" />
      <WithinGroup
        index="04"
        label={t.within}
        title={t.withinTitle}
        text={d.connection}
        others={others}
        locale={locale}
        explore={t.explore}
      />
      {next ? (
        <NextChapter label={t.next} kicker={next.kicker} title={next.name} href={divisionHref(locale, next.slug)} />
      ) : (
        <NextChapter
          label={t.next}
          kicker={dict.investment.hero.label}
          title={dict.investment.hero.title}
          href={localizedPath(locale, "/investment-guide")}
        />
      )}
      <CtaBand
        t={{ ...dict.ctaBand, button: `${t.enquire} ${d.name}` }}
        locale={locale}
        href={`${localizedPath(locale, "/contact")}?subject=${encodeURIComponent(d.subject)}#enquiry`}
      />
    </>
  );
}
