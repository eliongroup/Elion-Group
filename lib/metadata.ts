import type { Metadata } from "next";
import { site } from "@/content/site";
import { defaultLocale, locales, localizedPath } from "./i18n";

/** Canonical + hreflang alternates + Open Graph basics for a page path. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, path)]),
  );
  languages["x-default"] = localizedPath(defaultLocale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: localizedPath(locale, path), languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "en" ? "en_US" : locale,
      url: localizedPath(locale, path),
      title: absoluteTitle ? title : `${title} — ${site.name}`,
      description,
    },
    twitter: { card: "summary_large_image", title: absoluteTitle ? title : `${title} — ${site.name}`, description },
  };
}
