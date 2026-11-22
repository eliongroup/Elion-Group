import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { divisionSlugs, marketSlugs } from "@/lib/routes";

const knownChildren: Record<string, readonly string[]> = {
  businesses: divisionSlugs,
  "investment-guide": marketSlugs,
};

/**
 * Locale routing. The default locale (English) is served without a prefix:
 * "/about" is internally rewritten to "/en/about". Other locales keep their
 * prefix ("/ka/about", "/ar/about") once they are added to lib/i18n.ts.
 *
 * Unknown business or market slugs are sent to the catch-all route, which
 * answers with a real 404 status (streamed dynamic pages cannot change their
 * status once the shell has been sent).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = (locales as readonly string[]).includes(segments[0] ?? "");
  const locale = hasLocale ? segments[0] : defaultLocale;
  const rest = hasLocale ? segments.slice(1) : segments;

  const allowed = knownChildren[rest[0] ?? ""];
  if (allowed && rest[1] && !allowed.includes(rest[1])) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/__not-found/${rest.join("/")}`;
    return NextResponse.rewrite(url);
  }

  if (hasLocale) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // The admin panel (/admin) is not localized, so it is left out of the locale rewrite.
  matcher: ["/((?!_next|api|admin|images|video|fonts|favicon.ico|icon|apple-icon|logo.svg|sitemap.xml|robots.txt|.*\\..*).*)"],
};
