"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for every [data-reveal] element on the page (fade-up on scroll,
 * and the curtain reveal for [data-reveal="image"]).
 * Elements are visible in the server HTML; the hidden start state applies only
 * when <html class="js"> is set, and never under prefers-reduced-motion (CSS).
 *
 * Image curtains are fully clipped before they open, and browsers report a fully
 * clipped element as not intersecting, so for those we watch the parent instead.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const targets = new Map<Element, HTMLElement[]>();
    for (const el of elements) {
      const watch = el.dataset.reveal === "image" && el.parentElement ? el.parentElement : el;
      targets.set(watch, [...(targets.get(watch) ?? []), el]);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past, so a fast scroll never leaves a blank block behind.
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) continue;
          targets.get(entry.target)?.forEach((el) => el.setAttribute("data-shown", ""));
          observer.unobserve(entry.target);
        }
      },
      // Start slightly before an element enters the viewport, so it is already moving when it appears.
      { threshold: 0, rootMargin: "0px 0px 15% 0px" },
    );
    targets.forEach((_, target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
