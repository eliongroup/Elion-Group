import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { en } from "@/dictionaries/en";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = "The team of ELION GROUP";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Team", title: en.team.hero.title });
}
