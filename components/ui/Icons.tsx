import type { SVGProps } from "react";
import type { ValueIcon } from "@/dictionaries/en";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: IconProps) => ({
  width: size,
  height: size,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function ArrowIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size, props)} className={`flip-rtl ${className ?? ""}`}>
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
}

export function CloseIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size, props)}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable={false} {...props}>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.99-1.23 7.5 7.5 0 0 1-1.38-1.72c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"
      />
    </svg>
  );
}

/** Thin-line value icons, drawn on a 32px grid with a 1px stroke. */
export function ValueGlyph({ name, size = 32, ...props }: IconProps & { name: ValueIcon }) {
  const p = base(size, props);
  switch (name) {
    case "integrity":
      // A classical column
      return (
        <svg viewBox="0 0 32 32" {...p}>
          <path d="M6 7h20M8 4.5h16L26 7M6 7l2-2.5M9 10v15M13 10v15M19 10v15M23 10v15M7 10h18M7 25h18M5 28h22" />
        </svg>
      );
    case "craft":
      // A cut gem
      return (
        <svg viewBox="0 0 32 32" {...p}>
          <path d="M9 6h14l5 7-12 14L4 13l5-7ZM4 13h24M12.5 6 10 13l6 14 6-14-2.5-7M10 13l6-7 6 7" />
        </svg>
      );
    case "stewardship":
      // Growth rings
      return (
        <svg viewBox="0 0 32 32" {...p}>
          <circle cx="16" cy="16" r="12" />
          <circle cx="16" cy="16" r="8" />
          <circle cx="16" cy="16" r="4" />
          <path d="M16 2v4" />
        </svg>
      );
    case "discretion":
      // A closed seal
      return (
        <svg viewBox="0 0 32 32" {...p}>
          <rect x="7" y="14" width="18" height="13" />
          <path d="M11 14v-3.5a5 5 0 0 1 10 0V14M16 19v3" />
        </svg>
      );
  }
}
