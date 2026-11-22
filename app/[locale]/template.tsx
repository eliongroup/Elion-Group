"use client";

import { useEffect, useState } from "react";

/**
 * Page transition. A template re-mounts on every navigation, so the content
 * rises in gently when moving between pages. The first load is not animated
 * (keeps the hero instant for visitors and for performance metrics).
 */
declare global {
  interface Window {
    __elionNavigated?: boolean;
  }
}

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => typeof window !== "undefined" && window.__elionNavigated === true);
  useEffect(() => {
    window.__elionNavigated = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
