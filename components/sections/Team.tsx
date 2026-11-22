import Image from "next/image";
import { ButtonLink, Label, SectionHeading } from "@/components/ui/Primitives";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import type { TeamMember } from "@/lib/cms/types";
import lobbyImage from "@/public/images/office-library.jpg";

type Team = Dictionary["team"];

export function TeamIntro({ t }: { t: Team["intro"] }) {
  return (
    <section aria-label={t.label} className="section-y bg-white">
      <div className="container-lux grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4" data-reveal>
          <Label index={t.index} as="h2">
            {t.label}
          </Label>
        </div>
        <p
          className="font-serif text-[1.5rem] leading-[1.45] text-ink md:text-[2rem] lg:col-span-7 lg:col-start-6"
          data-reveal
        >
          {t.statement}
        </p>
      </div>
    </section>
  );
}

/** Leadership profiles, managed in the admin panel (/admin/team). Without a photo, a gold monogram panel is shown. */
export function LeadershipProfiles({ t, members }: { t: Team["leadership"]; members: TeamMember[] }) {
  return (
    <section aria-labelledby="team-leadership" className="section-y bg-ivory">
      <div className="container-lux">
        <SectionHeading index={t.index} label={t.label} title={t.title} intro={t.intro} id="team-leadership" />
        {members.length > 0 && (
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-28 lg:grid-cols-4">
          {members.map((p, i) => (
            <li key={p.id} data-reveal style={{ "--reveal-delay": `${(i % 4) * 90}ms` } as React.CSSProperties}>
              {p.photoUrl ? (
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                  <Image
                    src={p.photoUrl}
                    alt={t.photoAlt.replace("{name}", p.name).replace("{role}", p.role)}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div aria-hidden className="relative flex aspect-[4/5] items-center justify-center bg-ivory-deep">
                  <span className="absolute inset-2.5 border border-gold/50 sm:inset-4" />
                  <span className="font-serif text-[3rem] leading-none text-gold/70 sm:text-[4.5rem]">{p.name.charAt(0) || "E"}</span>
                </div>
              )}
              <h3 className="mt-5 font-serif text-[1.0625rem] text-ink sm:mt-7 sm:text-[1.375rem]">{p.name}</h3>
              <p className="label mt-2 text-[0.625rem] text-gold-ink sm:text-[0.6875rem]">{p.role}</p>
              {p.bio && <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted sm:mt-4 sm:text-[0.9375rem]">{p.bio}</p>}
            </li>
          ))}
        </ul>
        )}
      </div>
    </section>
  );
}

export function GroupFunctions({ t }: { t: Team["functions"] }) {
  return (
    <section aria-labelledby="team-functions" className="section-y bg-white">
      <div className="container-lux">
        <SectionHeading index={t.index} label={t.label} title={t.title} id="team-functions" />
        <ol className="mt-20 grid border-t border-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`border-b border-line py-10 sm:px-8 lg:border-b-0 ${i % 2 === 1 ? "sm:border-s" : "sm:ps-0"} ${
                i > 0 ? "lg:border-s lg:ps-8" : ""
              }`}
            >
              <span className="text-[2rem] font-light leading-none tabular-nums text-gold-ink" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-h3 text-ink">{item.title}</h3>
              <p className="mt-4 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Culture({ t }: { t: Team["culture"] }) {
  return (
    <section aria-labelledby="team-culture" className="bg-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[44rem]" data-reveal="image">
          <Image
            src={lobbyImage}
            alt={t.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={75}
            placeholder="blur"
            className="object-cover object-[60%_50%]"
          />
        </div>
        <div className="flex items-center px-[var(--gutter)] py-24 lg:px-20 xl:px-28">
          <div className="max-w-lg" data-reveal>
            <Label index={t.index}>{t.label}</Label>
            <h2 id="team-culture" className="mt-8 text-h2 text-ink">
              {t.title}
            </h2>
            <ul className="mt-12 border-t border-line">
              {t.points.map((point) => (
                <li key={point} className="flex gap-5 border-b border-line py-5 text-ink">
                  <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Careers({ t, locale }: { t: Team["careers"]; locale: string }) {
  return (
    <section aria-labelledby="team-careers" className="section-y bg-white">
      <div className="container-lux flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between" data-reveal>
        <div className="max-w-2xl">
          <Label>{t.label}</Label>
          <h2 id="team-careers" className="title-roman mt-8 text-h1 text-ink">
            {t.title}
          </h2>
          <p className="mt-6 max-w-lg text-muted">{t.text}</p>
        </div>
        <ButtonLink
          href={`${localizedPath(locale, "/contact")}?subject=Careers#enquiry`}
          variant="secondary"
          className="shrink-0"
        >
          {t.button}
        </ButtonLink>
      </div>
    </section>
  );
}
