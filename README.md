# ELION GROUP — corporate website

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Motion · Resend.
All pages are statically prerendered; the contact form is a Server Action.

## Run locally

Requires Node.js 20.9+ (tested on 22).

```bash
npm install
cp .env.example .env.local   # optional for local dev: without RESEND_API_KEY, messages are logged to the terminal
npm run dev                  # http://localhost:3000
```

Production check:

```bash
npm run build && npm start
npm run lint
```

## Deploy to Vercel

1. Push the folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel: **Add New → Project**, import the repository. Framework is detected automatically; no build settings needed.
3. Add environment variables (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://eliongroup.co`
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
4. In Resend, verify the sending domain (DNS records), then redeploy.
5. Add the custom domain under **Settings → Domains**.

In production, if the Resend variables are missing, the form shows its error state (it never pretends to send).

## Where things live

| What | Where |
|---|---|
| Company details (name, ID, address, email, phone, map) | `content/site.ts` |
| All page copy (English) | `dictionaries/en.ts` |
| Legal documents | `content/legal/en.ts` |
| Design tokens (colours, type scale, motion) | `app/globals.css` (`@theme`) |
| Pages (Home, About, Businesses + 3 business pages, Investment Guide, Team, Contact, Legal) | `app/[locale]/…` |
| Business & Investment Guide copy | `dictionaries/en-business.ts` |
| Sections / UI components | `components/` |
| Contact form server action | `app/[locale]/contact/actions.ts` |
| SEO: sitemap, robots, OG images, JSON-LD | `app/sitemap.ts`, `app/robots.ts`, `app/[locale]/**/opengraph-image.tsx`, `components/seo/JsonLd.tsx` |
| Placeholders to replace | `PLACEHOLDERS.md` |

## Adding Georgian or Arabic

1. `lib/i18n.ts` — add `"ka"` / `"ar"` to `locales`.
2. `dictionaries/ka.ts` — copy `en.ts`, translate, export `const ka = {...} satisfies Dictionary`.
3. Register it in `lib/dictionary.ts`, and add `content/legal/ka.ts` in `app/[locale]/legal/[slug]/page.tsx`.
4. Add fonts with the needed subsets in `app/[locale]/layout.tsx` (e.g. Noto Serif Georgian, Noto Naskh Arabic).

English stays at the root (`/about`); other languages are prefixed (`/ka/about`). Arabic gets `dir="rtl"` automatically; layouts use logical properties (`ms-`, `ps-`, `start-`), so they mirror.

## Notes

- Motion respects `prefers-reduced-motion` (no reveals, zoom or counters).
- Scroll reveals are CSS + one IntersectionObserver; content is visible without JavaScript.
- The map loads OpenStreetMap only after a click (no third-party request before consent).
- Cookie banner stores one first-party cookie, `elion_consent`; no analytics are installed.
- The in-memory rate limit for the form is per server instance; for strict limits use a shared store (e.g. Upstash Redis).
