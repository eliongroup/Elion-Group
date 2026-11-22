import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactDetails, LocationSection } from "@/components/sections/Contact";
import { SplitHero } from "@/components/sections/Shared";
import boardroom from "@/public/images/office-boardroom.jpg";
import { site } from "@/content/site";
import { en } from "@/dictionaries/en";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: dict.meta.contact.title, description: dict.meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const t = dict.contact;
  return (
    <>
      <SplitHero
        label={t.header.label}
        title={t.header.title}
        text={t.header.text}
        image={boardroom}
        imageAlt={t.header.imageAlt}
      />
      <section id="enquiry" aria-label={t.form.title} className="scroll-mt-[var(--header-h)] bg-white py-20 md:py-28">
        <div className="container-lux grid gap-y-20 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <ContactForm
              t={t.form}
              subjectValues={en.contact.form.subjects}
              privacyHref={localizedPath(locale, "/legal/privacy")}
              email={site.email}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ContactDetails t={t.details} />
          </div>
        </div>
      </section>
      <LocationSection t={t.map} />
    </>
  );
}
