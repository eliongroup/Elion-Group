import { site } from "@/content/site";
import type { Dictionary } from "@/dictionaries/en";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd({ dict }: { dict: Dictionary }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        description: dict.meta.siteDescription,
        foundingDate: String(site.foundedYear),
        taxID: site.registrationNumber,
        email: site.email,
        telephone: site.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.address.street}, ${site.address.floor}`,
          addressLocality: site.address.city,
          addressCountry: site.address.countryCode,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: site.email,
            telephone: site.phoneDisplay,
            availableLanguage: ["English"],
          },
        ],
        subOrganization: dict.divisions.map((d) => ({
          "@type": "Organization",
          name: d.name,
          description: d.summary,
          url: `${site.url}/businesses/${d.slug}`,
        })),
        sameAs: site.social.map((s) => s.href),
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      }}
    />
  );
}
