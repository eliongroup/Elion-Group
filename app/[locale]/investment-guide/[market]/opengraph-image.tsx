import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { en } from "@/dictionaries/en";

export const alt = "ELION GROUP Investment Guide";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return en.markets.map((m) => ({ market: m.slug }));
}

export default async function Image({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const m = en.markets.find((x) => x.slug === market) ?? en.markets[0];
  return renderOg({ eyebrow: "Investment Guide", title: `Investing in ${m.name}` });
}
