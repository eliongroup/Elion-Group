import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { en } from "@/dictionaries/en";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = "Investing in Georgia — ELION GROUP Investment Guide";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Investment Guide", title: en.investment.hero.title });
}
