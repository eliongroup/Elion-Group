import { Fragment, type ReactNode } from "react";

/**
 * Renders the simple formatting used in the admin editor as React elements
 * (never raw HTML, so article text cannot inject markup):
 *   blank line   new paragraph        ## / ###   headings
 *   - item       bulleted list        1. item    numbered list
 *   > text       quotation            **bold**, *italic*, [text](https://…)
 */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-ink/85">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (block.startsWith("### ")) {
          return <h3 key={i} className="pt-4 font-serif text-[1.5rem] leading-snug text-ink">{inline(block.slice(4))}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={i} className="pt-6 font-serif text-[1.875rem] leading-snug text-ink">{inline(block.slice(3))}</h2>;
        }
        if (lines.every((l) => /^[-*] /.test(l))) {
          return (
            <ul key={i} className="space-y-2 ps-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-4">
                  <span aria-hidden className="mt-[0.8em] size-1.5 shrink-0 rotate-45 bg-gold" />
                  <span>{inline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+[.)] /.test(l))) {
          return (
            <ol key={i} className="list-decimal space-y-2 ps-6 marker:text-gold-ink">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\d+[.)] /, ""))}</li>
              ))}
            </ol>
          );
        }
        if (lines.every((l) => l.startsWith(">"))) {
          return (
            <blockquote key={i} className="border-s-2 border-gold ps-6 font-serif text-[1.375rem] leading-normal text-ink">
              {withBreaks(lines.map((l) => l.replace(/^>\s?/, "")))}
            </blockquote>
          );
        }
        return <p key={i}>{withBreaks(lines)}</p>;
      })}
    </div>
  );
}

function withBreaks(lines: string[]): ReactNode {
  return lines.map((l, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {inline(l)}
    </Fragment>
  ));
}

const safeHref = (href: string) => /^(https?:\/\/|mailto:|\/(?!\/))/i.test(href);

/** **bold**, *italic* and [text](url). */
function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = match.index;
    if (match[1]) parts.push(<strong key={key} className="font-semibold text-ink">{match[1]}</strong>);
    else if (match[2]) parts.push(<em key={key}>{match[2]}</em>);
    else if (safeHref(match[4])) {
      const external = /^https?:\/\//i.test(match[4]);
      parts.push(
        <a
          key={key}
          href={match[4]}
          className="text-ink underline decoration-gold underline-offset-4 hover:text-gold-ink"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[3]}
        </a>,
      );
    } else parts.push(match[3]);
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
