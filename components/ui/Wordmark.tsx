/**
 * Placeholder wordmark: "ELION" with a thin gold line.
 * When public/logo.svg exists, pass `logoSrc="/logo.svg"` (the root layout
 * detects the file automatically) and the SVG is used instead.
 */
export function Wordmark({
  logoSrc,
  tone = "dark",
  size = "md",
}: {
  logoSrc?: string | null;
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  if (logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- an SVG logo needs no optimisation
      <img
        src={logoSrc}
        alt="ELION GROUP"
        width={size === "lg" ? 160 : 120}
        height={size === "lg" ? 40 : 30}
        className={`h-auto w-auto ${size === "lg" ? "max-h-10" : "max-h-8"} ${tone === "light" ? "brightness-0 invert" : ""}`}
      />
    );
  }
  return (
    <span className="inline-flex flex-col items-start leading-none" aria-label="ELION GROUP" role="img" translate="no">
      <span
        aria-hidden
        className={`font-serif font-medium tracking-[0.34em] ${size === "lg" ? "text-[2rem]" : "text-[1.375rem]"}`}
      >
        ELION
      </span>
      <span aria-hidden className="mt-1.5 flex w-full items-center gap-2">
        <span className="h-px flex-1" style={{ background: "var(--gradient-gold)" }} />
        <span className={`text-[0.5rem] font-medium tracking-[0.42em] ${tone === "light" ? "text-ivory/80" : "text-muted"}`}>
          GROUP
        </span>
      </span>
    </span>
  );
}
