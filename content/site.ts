/**
 * COMPANY DETAILS — single source of truth.
 * Registry data below is taken from the extract of the LEPL National Agency
 * of Public Registry. Remaining [BRACKETED] values are still placeholders.
 * Everything flows into the header, footer, contact page, legal pages,
 * JSON-LD schema, sitemap and Open Graph images.
 */
export const site = {
  name: "ELION GROUP",
  legalName: "Elion Group LLC",
  legalForm: "Limited Liability Company",
  registrationNumber: "404839519", // Identification number
  registrationDate: "16 November 2026",
  registry: "LEPL National Agency of Public Registry",
  governingBodies: ["General Meeting", "Directorate"],
  foundedYear: 2026,
  domain: "eliongroup.co",
  /** Used for canonical URLs, sitemap and OG. Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://eliongroup.co").replace(/\/$/, ""),
  email: "info@eliongroup.co",
  /** Primary number: used in header, footer, legal pages, schema and WhatsApp. */
  phoneDisplay: "+995 555 34 71 73",
  phoneHref: "+995555347173", // digits only, used for tel: and WhatsApp
  /** All numbers listed on the contact page. */
  phones: [
    { display: "+995 555 34 71 73", href: "+995555347173" },
    { display: "+995 510 00 26 23", href: "+995510002623" },
  ],
  address: {
    /** Legal address as registered */
    street: "12 Nikoloz Baratashvili St / 2 Sanapiro St",
    floor: "Floor 2",
    district: "Krtsanisi District",
    city: "Tbilisi",
    country: "Georgia",
    countryCode: "GE",
  },
  hours: "[Monday – Friday, 10:00 – 18:00]",
  /** Map centre: approximate position of 12 N. Baratashvili St, Tbilisi. Verify on the map before launch. */
  map: { lat: 41.6912, lng: 44.8088, zoom: 17 },
  legalRepresentative: "[DIRECTOR NAME]",
  legalUpdated: "[DATE]",
  social: [] as { label: string; href: string }[],
} as const;

export const whatsappHref = `https://wa.me/${site.phoneHref.replace(/\D/g, "")}`;
export const fullAddress = `${site.address.street}, ${site.address.floor}, ${site.address.district}, ${site.address.city}, ${site.address.country}`;
export const shortAddress = `${site.address.city}, ${site.address.country}`;
