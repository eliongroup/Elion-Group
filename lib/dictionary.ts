import "server-only";
import { locale as rootLocale } from "next/root-params";
import type { Dictionary } from "@/dictionaries/en";
import { defaultLocale, hasLocale, type Locale } from "./i18n";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en").then((m) => m.en),
  // ka: () => import("@/dictionaries/ka").then((m) => m.ka),
  // ar: () => import("@/dictionaries/ar").then((m) => m.ar),
};

/** Current locale from the [locale] root segment, falling back to the default. */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  return value && hasLocale(value) ? value : defaultLocale;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return dictionaries[locale ?? (await getLocale())]();
}
