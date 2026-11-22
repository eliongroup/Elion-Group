import type { Metadata } from "next";
import { Inter, Marcellus } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { Wordmark } from "@/components/ui/Wordmark";
import { en } from "@/dictionaries/en";
import { defaultLocale } from "@/lib/i18n";

const serif = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${en.meta.notFound.title} — ELION GROUP`,
  robots: { index: false, follow: true },
};

/** Fallback 404 for URLs that never reach a locale layout. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-ivory">
        <header className="fixed inset-x-0 top-0 z-10 border-b border-line bg-white">
          <div className="container-lux flex h-[var(--header-h)] items-center">
            <Link href="/" aria-label="ELION GROUP — Home" className="inline-flex min-h-11 items-center">
              <Wordmark />
            </Link>
          </div>
        </header>
        <main>
          <NotFoundView t={en.notFound} locale={defaultLocale} />
        </main>
      </body>
    </html>
  );
}
