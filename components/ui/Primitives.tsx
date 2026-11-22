import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./Icons";

/** Small uppercase label with optional index number and gold rule. */
export function Label({
  index,
  children,
  tone = "dark",
  as: Tag = "p",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  as?: "p" | "span" | "h2";
  className?: string;
}) {
  return (
    <Tag className={`label flex items-center gap-4 ${tone === "light" ? "text-ivory/85" : "text-muted"} ${className}`}>
      {index && (
        <span className={tone === "light" ? "text-gold-light" : "text-gold-ink"} aria-hidden>
          {index}
        </span>
      )}
      <span className="gold-rule" aria-hidden />
      <span>{children}</span>
    </Tag>
  );
}

type Variant = "primary" | "secondary" | "secondary-light";

const variants: Record<Variant, string> = {
  primary: "btn-shine text-ink [background:var(--gradient-gold-btn)] hover:[background:var(--color-gold-light)]",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-ivory",
  "secondary-light": "border border-ivory/70 text-ivory hover:bg-ivory hover:text-ink on-dark",
};

const buttonBase =
  "group label text-[0.75rem] inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-3 px-8 transition-[background-color,color,filter,transform] duration-300 ease-lux active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link {...props} className={`${buttonBase} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <ArrowIcon className="transition-transform duration-300 ease-lux group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button {...props} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

/** Text link with arrow and a gold underline that draws on hover. */
export function TextLink({
  className = "",
  children,
  tone = "dark",
  ...props
}: ComponentProps<typeof Link> & { tone?: "dark" | "light" }) {
  return (
    <Link
      {...props}
      className={`group label inline-flex min-h-11 items-center gap-3 ${tone === "light" ? "text-ivory on-dark" : "text-ink"} ${className}`}
    >
      <span className="link-draw link-draw-static">{children}</span>
      <ArrowIcon className="transition-transform duration-300 ease-lux group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
  tone = "dark",
  id,
}: {
  index?: string;
  label: string;
  title?: string;
  intro?: string;
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <header className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6" data-reveal>
      <div className="lg:col-span-4">
        <Label index={index} tone={tone}>
          {label}
        </Label>
      </div>
      {(title || intro) && (
        <div className="lg:col-span-7 lg:col-start-6">
          {title && (
            <h2 id={id} className={`text-h2 ${tone === "light" ? "text-ivory" : "text-ink"}`}>
              {title}
            </h2>
          )}
          {intro && (
            <p className={`mt-6 max-w-xl ${tone === "light" ? "text-ivory/80" : "text-muted"}`}>{intro}</p>
          )}
        </div>
      )}
    </header>
  );
}
