import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { legalSlugs } from "@/content/legal/en";
import { locales, localizedPath } from "@/lib/i18n";
import { divisionSlugs, marketSlugs } from "@/lib/routes";
import { getPublishedPosts } from "@/lib/cms/data";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/businesses", priority: 0.9, changeFrequency: "monthly" },
  ...divisionSlugs.map((d) => ({ path: `/businesses/${d}`, priority: 0.8, changeFrequency: "monthly" as const })),
  { path: "/investment-guide", priority: 0.9, changeFrequency: "monthly" },
  ...marketSlugs.map((m) => ({
    path: `/investment-guide/${m}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ...legalSlugs.map((slug) => ({ path: `/legal/${slug}`, priority: 0.3, changeFrequency: "yearly" as const })),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPublishedPosts()).map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "yearly" as const }));
  return [...routes, ...posts].flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}${localizedPath(locale, route.path)}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localizedPath(l, route.path)}`])),
      },
    })),
  );
}
