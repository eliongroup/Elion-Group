import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { en } from "@/dictionaries/en";

export const alt = "ELION GROUP business";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return en.divisions.map((d) => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = en.divisions.find((x) => x.slug === slug) ?? en.divisions[0];
  return renderOg({ eyebrow: d.kicker, title: d.name });
}
