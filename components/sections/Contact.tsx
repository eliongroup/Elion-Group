import Image from "next/image";
import { fullAddress, site, whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MapEmbed } from "./MapEmbed";
import type { Dictionary } from "@/dictionaries/en";
import officeImage from "@/public/images/hero-facade.jpg";

export function ContactDetails({ t }: { t: Dictionary["contact"]["details"] }) {
  const row = "border-t border-line py-6";
  return (
    <aside aria-label={t.title}>
      <dl>
        <div className={row}>
          <dt className="label text-muted">{t.office}</dt>
          <dd className="mt-3 font-serif text-xl text-ink">
            <address className="not-italic">
              {site.address.street.split(" / ").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
              <span className="block">
                {site.address.floor}, {site.address.district}
              </span>
              <span className="block">
                {site.address.city}, {site.address.country}
              </span>
            </address>
          </dd>
        </div>
        <div className={row}>
          <dt className="label text-muted">{t.email}</dt>
          <dd className="mt-3">
            <a href={`mailto:${site.email}`} className="link-draw font-serif text-xl text-ink">
              {site.email}
            </a>
          </dd>
        </div>
        <div className={row}>
          <dt className="label text-muted">{t.phone}</dt>
          {site.phones.map((p) => (
            <dd key={p.href} className="mt-3">
              <a href={`tel:${p.href}`} className="link-draw font-serif text-xl text-ink">
                {p.display}
              </a>
            </dd>
          ))}
        </div>
        <div className={row}>
          <dt className="label text-muted">{t.hours}</dt>
          <dd className="mt-3 text-ink">{site.hours}</dd>
        </div>
      </dl>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="label mt-4 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-3 border border-ink px-6 text-[0.75rem] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory"
      >
        <WhatsAppIcon />
        {t.whatsapp}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </aside>
  );
}

export function LocationSection({ t }: { t: Dictionary["contact"]["map"] }) {
  const { lat, lng, zoom } = site.map;
  const d = 0.008;
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join(",");
  return (
    <section aria-labelledby="location-title" className="bg-white pb-[var(--section-y)]">
      <div className="container-lux">
        <h2 id="location-title" className="sr-only">
          {t.title}
        </h2>
        <MapEmbed
          t={t}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`}
          address={fullAddress}
          preview={
            <Image
              src={officeImage}
              alt={t.previewAlt}
              fill
              sizes="(min-width: 1440px) 1360px, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover grayscale"
            />
          }
        />
      </div>
    </section>
  );
}
