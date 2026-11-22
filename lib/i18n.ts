/**
 * i18n configuration.
 * To add a language: add it to `locales`, create dictionaries/<code>.ts and
 * content/legal/<code>.ts, and register both loaders below. Arabic ("ar")
 * is already listed in `rtlLocales`, so <html dir="rtl"> is set automatically.
 */
export const locales = ["en"] as const; // later: "ka", "ar"
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const rtlLocales: readonly string[] = ["ar"];

export const localeNames: Record<string, string> = {
  en: "English",
  ka: "ქართული",
  ar: "العربية",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirFor(locale: string): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/** Build a localized path. The default locale is served without a prefix. */
export function localizedPath(locale: string, path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
