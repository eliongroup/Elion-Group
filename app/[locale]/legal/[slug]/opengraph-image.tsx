import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { legalDocuments, legalSlugs, type LegalSlug } from "@/content/legal/en";

export const alt = "ELION GROUP — Legal";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocuments[slug as LegalSlug] ?? legalDocuments.privacy;
  return renderOg({ eyebrow: "Legal", title: doc.title });
}
