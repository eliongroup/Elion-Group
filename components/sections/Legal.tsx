import Link from "next/link";
import { LegalToc } from "./LegalToc";
import { TextHeader } from "./Shared";
import type { LegalBlock, LegalDocument, LegalSlug } from "@/content/legal/en";
import { legalSlugs } from "@/content/legal/en";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";

export function LegalLayout({
  doc,
  t,
  nav,
  updated,
  locale,
}: {
  doc: LegalDocument;
  t: Dictionary["legal"];
  nav: Dictionary["legalNav"];
  updated: string;
  locale: string;
}) {
  return (
    <>
      <TextHeader label={t.label} title={doc.title}>
        <p className="hero-rise mt-6 text-sm text-muted" style={{ animationDelay: "200ms" }}>
          {t.updated}: {updated}
        </p>
      </TextHeader>

      <div className="bg-white py-16 md:py-24">
        <div className="container-lux grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <LegalToc
                label={t.onThisPage}
                items={doc.sections.map((s) => ({ id: s.id, heading: s.heading }))}
              />
              <nav aria-label={t.otherDocuments} className="mt-12 hidden lg:block">
                <p className="label text-muted">{t.otherDocuments}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {legalSlugs
                    .filter((s) => s !== doc.slug)
                    .map((slug: LegalSlug) => (
                      <li key={slug}>
                        <Link href={localizedPath(locale, `/legal/${slug}`)} className="link-draw text-ink">
                          {nav[slug]}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>

          <article className="lg:col-span-7 lg:col-start-5">
            <div role="note" className="mb-14 border-s-2 border-gold bg-ivory px-6 py-5">
              <p className="label text-ink">{t.draft}</p>
              <p className="mt-2 text-sm text-muted">{t.draftText}</p>
            </div>
            <p className="font-serif text-lead text-ink">{doc.intro}</p>
            <div className="prose-legal mt-14">
              {doc.sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id}>{section.heading}</h2>
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "table": {
      const hasHead = block.head.some(Boolean);
      return (
        <div className="overflow-x-auto">
          <table>
            {hasHead && (
              <thead>
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) =>
                    !hasHead && i === 0 ? (
                      <th key={i} scope="row" className="w-2/5 !normal-case !tracking-normal !text-[0.9375rem]">
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
