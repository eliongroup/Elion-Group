import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/sections/Legal";
import { legalDocuments, legalSlugs, type LegalSlug } from "@/content/legal/en";
import { site } from "@/content/site";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

// Legal texts per locale. Add e.g. `ka: kaLegalDocuments` when translated.
const documentsByLocale = { en: legalDocuments } as const;

function isSlug(value: string): value is LegalSlug {
  return (legalSlugs as readonly string[]).includes(value);
}

export async function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale) || !isSlug(slug)) return {};
  const doc = documentsByLocale[locale][slug];
  return pageMetadata({ locale, path: `/legal/${slug}`, title: doc.title, description: doc.description });
}

export default async function LegalPage({ params }: PageProps<"/[locale]/legal/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale) || !isSlug(slug)) notFound();
  const dict = await getDictionary();
  return (
    <LegalLayout
      doc={documentsByLocale[locale][slug]}
      t={dict.legal}
      nav={dict.legalNav}
      updated={site.legalUpdated}
      locale={locale}
    />
  );
}
