/** Shared admin styles, so every form looks the same. */
export const inputClass =
  "w-full border border-line-strong bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";
export const labelClass = "label text-[0.6875rem] text-ink";
export const buttonPrimary =
  "label inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-ink px-6 text-[0.6875rem] text-ivory transition-colors hover:bg-gold-ink disabled:cursor-wait disabled:opacity-60";
export const buttonSecondary =
  "label inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-ink px-6 text-[0.6875rem] text-ink transition-colors hover:bg-ink hover:text-ivory";
export const buttonQuiet =
  "label inline-flex min-h-9 cursor-pointer items-center justify-center px-3 text-[0.625rem] text-ink underline decoration-gold underline-offset-4 hover:text-gold-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:no-underline";
export const buttonIcon =
  "inline-flex size-9 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line";

/* ---------------------------------------------------------------- Icons */

const paths = {
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  team: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M21 19v-1a4 4 0 0 0-3-3.87M15.5 3.13a3.5 3.5 0 0 1 0 6.75",
  blog: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",
  plus: "M12 5v14M5 12h14",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  logout: "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10",
  menu: "M4 7h16M4 12h16M4 17h16",
  edit: "M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  up: "M12 19V5M6 11l6-6 6 6",
  down: "M12 5v14M6 13l6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  back: "M19 12H5M11 6l-6 6 6 6",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-[18px]" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}

/* ---------------------------------------------------------------- Bits */

export function Notice({ tone = "success", children }: { tone?: "success" | "warning"; children: React.ReactNode }) {
  return (
    <p
      role="status"
      className={`mb-6 border-s-2 px-4 py-3 text-[0.9375rem] ${tone === "success" ? "border-gold bg-white text-ink" : "border-red-700 bg-red-50 text-red-900"}`}
    >
      {children}
    </p>
  );
}

export function EmptyState({ text, action }: { text: string; action: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-6 border border-dashed border-line-strong bg-white px-6 py-16 text-center">
      <p className="max-w-md text-muted">{text}</p>
      {action}
    </div>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "gold"; children: React.ReactNode }) {
  return (
    <span className={`label inline-flex px-2 py-1 text-[0.5625rem] ${tone === "gold" ? "bg-gold/15 text-gold-ink" : "bg-ivory-deep text-muted"}`}>
      {children}
    </span>
  );
}

/** A titled group of fields inside a form. */
export function FormSection({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6 border border-line bg-white p-6 sm:p-8">
      <div>
        <h2 className="font-serif text-[1.25rem] text-ink">{title}</h2>
        {hint && <p className="mt-1 text-[0.875rem] text-muted">{hint}</p>}
      </div>
      {children}
    </section>
  );
}
