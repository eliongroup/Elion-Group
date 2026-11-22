import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Marcellus } from "next/font/google";
import "../globals.css";

const serif = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — ELION Admin" },
  robots: { index: false, follow: false },
};

/** The admin panel has its own root layout: no public header, footer or cookie banner. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory text-ink">
        {/* Every admin page reads the session cookie, so it renders per request. */}
        <Suspense fallback={<p className="p-10 text-muted">Loading…</p>}>{children}</Suspense>
      </body>
    </html>
  );
}
