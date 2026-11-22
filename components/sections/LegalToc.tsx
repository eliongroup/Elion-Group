"use client";

import { useEffect, useState } from "react";

/** Table of contents; highlights the section in view. Collapsible on small screens. */
export function LegalToc({ label, items }: { label: string; items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ol className="space-y-1 border-s border-line">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={`-ms-px block border-s py-2 ps-4 text-sm transition-colors duration-200 ${
              active === item.id ? "border-gold text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {item.heading}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label={label}>
      <details className="group border-y border-line lg:hidden">
        <summary className="label flex min-h-12 cursor-pointer list-none items-center justify-between text-ink">
          {label}
          <span aria-hidden className="text-lg transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-6">{list}</div>
      </details>
      <div className="hidden lg:block">
        <p className="label mb-4 text-muted">{label}</p>
        {list}
      </div>
    </nav>
  );
}
