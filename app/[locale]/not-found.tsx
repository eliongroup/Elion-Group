import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { getDictionary, getLocale } from "@/lib/dictionary";
import { en } from "@/dictionaries/en";

export const metadata: Metadata = {
  title: en.meta.notFound.title,
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return <NotFoundView t={dict.notFound} locale={locale} />;
}
