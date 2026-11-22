# ELION GROUP — Corporate Website Plan

Status: **approved and built** (see "Build notes" at the end for changes made during the build).

Direction in one line: a quiet, editorial holding-group site. Ivory and white grounds, charcoal type, gold used only as hairlines, small marks and one key CTA. Large serif headlines, asymmetric layouts, very generous space and slow, restrained motion.

---

## 1. Sitemap and wireframes

```
/                      Home
/about                 About
/contact               Contact
/legal/privacy         Privacy Policy
/legal/terms           Terms of Use
/legal/cookies         Cookie Policy
/legal/notice          Legal Notice / Company Information
/legal/disclaimer      Disclaimer
/*                     404
```
With i18n, every route lives under `/[locale]/…` (`/en/about`). English is served at the root by default, with no `/en` prefix, so URLs stay clean now. `/ka` and `/ar` are added later.

Global chrome on every page:
- **Header** (sticky). Transparent over the hero with white text. After 80px of scroll it turns solid white with charcoal text and a 1px hairline underneath. Layout: wordmark on the left; About · Brands · Contact in the centre/right; one small "Enquire" text link with a gold underline. On mobile: wordmark plus a "Menu" text button.
- **Mobile menu**: a full-screen ivory panel. Large serif links are listed vertically with an index number (01, 02, 03) and a thin gold rule between items. Contact details sit at the bottom. Focus is trapped inside the panel, Esc closes it, and the page behind does not scroll.
- **Footer**: charcoal (#1A1A1A) ground with ivory text. Wordmark plus a one-line positioning statement, then three columns: Group (About, Brands, Contact), Legal (5 links), Contact (email, phone, address). A 1px gold rule above the bottom line: "© 2026 ELION GROUP LLC · Registered in Georgia · ID [XXXXXXXXX]" and a "Cookie settings" link.

### 1.1 Home

| # | Section | Layout (desktop → mobile) |
|---|---|---|
| H1 | **Hero** | Full viewport (100svh). Background is a slow architectural video with a poster image; the image zooms from 1.00 to 1.06 over 20s. A dark gradient from the bottom keeps the text readable. Text sits bottom-left, not centred: a small label "ELION GROUP — EST. 2026" in wide tracking, the H1 "Building Enduring Legacies", the one-line sub "A Georgian holding group building lasting brands in real estate, luxury goods and future ventures.", and one CTA "Discover the Group" (text plus a thin arrow and a gold underline). Bottom-right: a small "Scroll" cue with a 1px vertical line. Mobile keeps the same order with the text full width. |
| H2 | **Group introduction** | Asymmetric 12-column grid. Left (cols 1–4): label "01 — The Group" with a short gold rule. Right (cols 6–12): a 2–3 line serif statement at 32–40px. Below, across the full width, a row of 4 figures separated by hairlines: a large serif number and a small uppercase label (e.g. "2026 · Founded", "3 · Sectors", "[X] · Projects in development", "[X] · Partners"). The counters animate once when they come into view. With reduced motion, the final numbers show immediately. Mobile uses a 2×2 grid of figures. |
| H3 | **Our Brands** | Section heading on the left: "Our Brands" plus one line of intro. A 3-card editorial grid with unequal sizes: Elion Real Estate is a tall card (cols 1–7, 4:5 image), and Elion Timepieces and Future Ventures are stacked on the right (cols 8–12). Each card has an image, a status label ("Active" / "Coming Soon" / "In Formation"), the brand name in serif, one line of description and an arrow. Hover: the image zooms to 1.03 over 700ms, a gold rule draws left to right under the name, and the arrow moves 4px. The Timepieces image is desaturated with a "Coming Soon" label. Future Ventures uses a marble texture with no product. Mobile stacks the cards in a single column. |
| H4 | **Vision & Values** | Ivory (#FAF8F3) ground. Centred label "02 — What Guides Us" and a serif H2 "Principles that outlast cycles". Four pillars in a row, separated by vertical hairlines: Integrity · Craftsmanship · Long-term Stewardship · Discretion. Each pillar has a 32px thin-line gold icon (custom SVG at 1px stroke), a serif title and two lines of body text. Tablet uses 2×2, mobile one column with horizontal hairlines. |
| H5 | **Leadership message** | Split layout. Left (cols 1–5): a portrait image (placeholder, 3:4). Right (cols 7–12): an oversized gold quotation mark (decorative, aria-hidden), the quote in serif italic at 28–36px, then the name and title in small caps with a gold rule. Mobile stacks image above quote. |
| H6 | **Contact CTA band** | Full-bleed image band (marble or skyline) under a charcoal overlay at 70%. Centred serif line "Begin a conversation." and the only gold-filled button on the page, "Contact the Group" (charcoal text on gold). |
| — | Footer | — |

### 1.2 About

| # | Section | Layout |
|---|---|---|
| A1 | **Page hero** | 70vh image (architecture) with the H1 "Our Story" and a small breadcrumb label "About" in wide tracking. |
| A2 | **Our story** | Editorial two-column layout: a large serif lede (cols 1–6) and body text in two short paragraphs (cols 8–12). A drop cap is optional. |
| A3 | **Mission & Vision** | Two halves separated by a vertical gold hairline. Each half has a label ("Mission" / "Vision") and one serif paragraph. Mobile stacks them with a horizontal hairline. |
| A4 | **Values** | The same four pillars as H4 in a compact list variant: number, title and text, with hairline rows. |
| A5 | **Group structure** | An SVG diagram drawn with thin lines. "ELION GROUP" sits at the top in a box with a thin gold border. A vertical line drops to a horizontal bus, which branches to three nodes: Elion Real Estate (Active), Elion Timepieces (Coming Soon) and Future Ventures (In Formation). On mobile it becomes a vertical tree. It is real HTML/SVG with text, not an image, so screen readers get it as a list. |
| A6 | **Leadership** | 3 placeholder cards: a 3:4 portrait (grayscale that warms to colour on hover), name, title and a short line. No social icons. |
| A7 | **Timeline** | A horizontal timeline on desktop: a gold 1px line with year markers 2026 (Founded) → 2026 (Elion Real Estate) → 2027 (Elion Timepieces) → Future. On mobile it becomes a vertical line on the start side. Each entry has a year in serif and a short text. |
| A8 | Contact CTA band (shared) | — |

### 1.3 Contact

| # | Section | Layout |
|---|---|---|
| C1 | **Page header** | No image. An ivory band with the label "Contact", the H1 "Begin a conversation" and one line of sub-text. Calm, with lots of air. |
| C2 | **Form + details** | Asymmetric. Form on the left (cols 1–7); details on the right (cols 9–12). **Form fields**: Name*, Email*, Phone, Subject* (select: General enquiry / Real estate / Partnerships / Press / Other), Message*. Underline-style inputs (1px charcoal/20% bottom border that turns gold on focus, with a visible focus ring as well), visible labels and errors under each field. Also a hidden honeypot field and a consent checkbox linking to the Privacy Policy. **States**: idle → submitting (button shows a spinner and is disabled) → success (an inline panel replaces the form: "Thank you. We will reply within two business days.") / error (an inline alert with a retry option; the entered data is kept). Errors are announced through `aria-live`. **Details column**: Office (address), Email, Phone, a "Message on WhatsApp" outlined button with the WhatsApp glyph, and office hours. |
| C3 | **Map** | A full-width 16:7 map. The map is click-to-load: a static styled preview with a "Load map" button, then an OpenStreetMap or Google Maps iframe. This keeps third-party cookies and roughly 500KB of JS off the page until the visitor asks for the map. |

### 1.4 Legal pages (one shared template)
- An ivory header band with the label "Legal", the H1 (e.g. "Privacy Policy") and "Last updated: [DATE]".
- A prominent notice box with a thin gold left border: **"DRAFT – to be reviewed by a lawyer."**
- Two columns on desktop: a sticky table of contents on the left (cols 1–3) that highlights the current section, and the content on the right (cols 5–11) with a 68ch measure. Mobile shows the TOC as a collapsible "On this page".
- Content is authored as typed data (headings + paragraphs/lists), so translating it later is just adding a file.
- Contents:
  - **Privacy**: controller identity, data collected (contact form, technical/cookie data), purposes and legal bases, retention, recipients (Resend as processor, hosting), international transfers, rights (access, rectification, erasure, restriction, portability, objection, withdrawing consent), the right to complain to Georgia's Personal Data Protection Service, contact. It refers to the Law of Georgia on Personal Data Protection (2023) with GDPR-style rights.
  - **Terms of Use**, **Cookie Policy** (with a cookie table), **Legal Notice** (registered name, ID, address, contacts, responsible person), **Disclaimer** (brands under development, no investment offer, forward-looking statements, no warranty).
- **Cookie banner**: a small card at the bottom-left (bottom sheet on mobile): one sentence, "Accept" / "Decline" / "Settings". Two categories: Essential (always on) and Analytics (off by default; nothing loads until you choose a tool). The choice is stored in a first-party cookie for 12 months, and the footer link reopens the banner.

### 1.5 404
Full-screen ivory. A very large light serif "404" with a thin gold rule through its middle, the line "This page has moved or never existed.", and two links: "Return home" and "Contact". No image.

---

## 2. Design system

### 2.1 Colour tokens (CSS variables → Tailwind theme)

| Token | Value | Use |
|---|---|---|
| `--color-white` | `#FFFFFF` | Primary ground |
| `--color-ivory` | `#FAF8F3` | Alternate section ground, legal header |
| `--color-ivory-deep` | `#F2EEE4` | Placeholders, form fill on hover |
| `--color-ink` | `#1A1A1A` | Headings, body, footer ground |
| `--color-ink-muted` | `#6B6B6B` | Secondary text (5.3:1 on white, 5.0:1 on ivory: passes AA) |
| `--color-line` | `rgba(26,26,26,0.12)` | Neutral hairlines |
| `--color-gold` | `#B8955A` | Lines, icons, focus/hover accents, gold button fill. **Never text on light grounds** (2.8:1) |
| `--color-gold-light` | `#C9A96E` | Gradient start; gold text **on charcoal** (7.8:1) |
| `--color-gold-deep` | `#9E7B3F` | Gradient end |
| `--color-gold-ink` | `#8A6A33` | The only gold allowed as small text on white (5.0:1), for labels like "Active" |
| `--gradient-gold` | `linear-gradient(135deg,#C9A96E 0%,#B8955A 50%,#9E7B3F 100%)` | Hairlines, icon strokes, the CTA button fill only |
| `--color-error` | `#A4282C` | Form errors (7.2:1) |
| `--color-success` | `#2F5D46` | Form success (7.4:1) |

Contrast pairs checked: ink on gold button = 6.3:1. Ivory on charcoal = 16:1. White text over the hero uses a gradient overlay that keeps at least 4.5:1 behind the text block.

### 2.2 Typography
- **Display/headings**: *Cormorant Garamond* (300/400/500, plus 400 italic for quotes). It is very elegant at large sizes; it is never used below 20px.
- **Body/UI**: *Manrope* (variable 400–600). It is clear at small sizes and has a slight geometric warmth that sits well beside Cormorant.
- Loaded with `next/font/google` (self-hosted, `display: swap`, subset `latin`; `latin-ext` + Georgian (*Noto Sans Georgian*) and Arabic (*Noto Naskh Arabic* / *IBM Plex Sans Arabic*) are added per locale later).

Type scale (fluid with `clamp`, ratio ≈ 1.333):

| Token | Size (mobile → desktop) | Font / settings |
|---|---|---|
| `display` | 48 → 104px, lh 1.0, tracking -0.01em | Cormorant 300 |
| `h1` | 40 → 72px, lh 1.05 | Cormorant 300 |
| `h2` | 32 → 52px, lh 1.1 | Cormorant 400 |
| `h3` | 24 → 32px, lh 1.2 | Cormorant 500 |
| `lead` | 20 → 24px, lh 1.5 | Cormorant 400 |
| `body` | 16 → 17px, lh 1.7, measure ≤ 68ch | Manrope 400 |
| `small` | 14px, lh 1.6 | Manrope 400 |
| `label` | 11–12px, **uppercase, tracking 0.24em**, weight 500 | Manrope |

### 2.3 Spacing (4px base, spacious)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 200`
- Section vertical padding: `clamp(96px, 14vw, 200px)`.
- Container: max 1440px with side gutters `clamp(20px, 5vw, 80px)`, which gives 20px at 375px. The left and right content edges are always equal.
- Grid: 12 columns with a 24px gap on desktop, 6 columns on tablet, 4 columns with a 16px gap on mobile.

### 2.4 Radius, borders, shadows
- **Radius: 0** everywhere (images, cards, buttons, inputs). Square corners read as architectural and serious. The only exception is a 2px radius on focus rings.
- **Borders**: 1px hairlines only. A gold rule is 1px high and 32–64px wide, used as a marker before labels and under headings.
- **Shadows**: almost none. Only one, `0 24px 48px -24px rgba(26,26,26,0.18)`, on the cookie banner and the menu panel. Cards get no shadow; depth comes from the images.

### 2.5 Buttons and links (one system)
- **Primary** (used at most once per screen): gold gradient fill, charcoal text, a label in 12px uppercase with 0.2em tracking, height 52px, padding 32px. Hover: the fill shifts to deep gold and the arrow moves 4px. Active: scale 0.98.
- **Secondary**: transparent with a 1px charcoal border (white on dark). Hover: it fills charcoal with ivory text.
- **Text link / CTA**: a label plus a thin arrow, with a 1px underline that draws from the start side on hover (gold).
- **Focus**: a 2px outline in `--color-ink` (on light) or ivory (on dark) with a 3px offset, always visible with `:focus-visible`. Gold is never the only focus indicator.

### 2.6 Motion rules
- Library: **Motion** (`motion/react`, the current Framer Motion package).
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) for all reveals.
- **Fade-up on scroll**: opacity 0 → 1, y 24px → 0, 800ms, triggered once at 15% visibility, with a stagger of 80ms between siblings, never more than 4 per group. The content is in the server HTML and visible without JS; the animation is only an enhancement.
- **Hero**: a slow zoom of 1.00 → 1.06 over 20s (CSS transform only). The headline lines rise in sequence over 1.2s.
- **Hover**: image zoom of 1.03 over 700ms; underline draw over 400ms; arrow shift over 300ms. Color changes take 200ms.
- **Header** background/colour transition: 400ms.
- **Counters**: 1.6s ease-out, once.
- **Only `transform` and `opacity` are animated**, never layout properties.
- **`prefers-reduced-motion: reduce`**: no reveals (content is shown at once), no zoom, no counters (final values), no hero video (poster image only), and hovers change colour only.

### 2.7 Iconography
Custom 1px-stroke line icons (24/32px) in gold for the value pillars, plus a minimal arrow, menu, close and WhatsApp glyph. The icons are inline SVG with `aria-hidden` and labelled buttons. No emoji and no icon font.

### 2.8 Imagery
Warm, architectural and quiet: stone, marble, brass, long shadows, dusk skylines and watch details. Consistent grading (slightly warm, low saturation). All images use `next/image` (AVIF/WebP) with exact aspect ratios so the layout doesn't shift. A full list of Unsplash placeholders goes in `PLACEHOLDERS.md` at build time.

---

## 3. Tech stack and folder structure

| Concern | Choice |
|---|---|
| Framework | **Next.js (latest stable, App Router) + TypeScript (strict)** |
| Styling | **Tailwind CSS v4**. Tokens are defined once as CSS variables in `app/globals.css` with `@theme`; v4 replaces `tailwind.config` with this. RTL uses logical utilities (`ms-*`, `ps-*`, `start-*`, `text-start`). |
| i18n | **next-intl**: a `[locale]` segment, messages in `/messages/en.json`, `dir="rtl"` set automatically for `ar`, and a locale switcher hidden until a second language exists. |
| Motion | `motion` (Framer Motion) |
| Forms | A Server Action with **Zod** validation shared by client and server, a honeypot, a simple per-IP rate limit, and **Resend** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Without a key it logs and returns success in development. |
| SEO | Next Metadata API, `opengraph-image.tsx` (generated OG images per page in the brand style), `sitemap.ts`, `robots.ts`, and Organization + WebSite JSON-LD |
| Quality | ESLint, Prettier, `@axe-core/playwright` a11y checks, and Lighthouse CI run locally |
| Deploy | Vercel (zero-config), with env vars documented in `.env.example` |

```
elion-group/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx            # html lang/dir, fonts, header, footer, cookie banner, JSON-LD
│  │  ├─ page.tsx              # Home
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ contact/actions.ts    # server action (Zod + honeypot + Resend)
│  │  ├─ legal/[slug]/page.tsx # one template, 5 documents (generateStaticParams)
│  │  ├─ not-found.tsx
│  │  └─ opengraph-image.tsx
│  ├─ globals.css              # tokens (@theme), base, utilities
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ not-found.tsx            # root 404 fallback
├─ components/
│  ├─ layout/    Header, MobileMenu, Footer, Container, Section
│  ├─ ui/        Button, TextLink, Label, GoldRule, Icon, Field, Select, Checkbox
│  ├─ motion/    Reveal, Stagger, Counter, SlowZoom
│  ├─ sections/  Hero, PageHero, GroupIntro, KeyFigures, BrandsGrid, BrandCard,
│  │             ValuesPillars, LeadershipQuote, CtaBand, Story, MissionVision,
│  │             GroupStructure, LeadershipGrid, Timeline, ContactForm,
│  │             ContactDetails, MapEmbed, LegalLayout, LegalToc
│  ├─ consent/   CookieBanner, ConsentProvider
│  └─ seo/       JsonLd
├─ content/
│  ├─ site.ts               # company details (all placeholders in ONE file)
│  ├─ brands.ts
│  └─ legal/en/*.ts         # privacy, terms, cookies, notice, disclaimer
├─ i18n/         routing.ts, request.ts
├─ messages/     en.json    (ka.json, ar.json later)
├─ lib/          validation.ts, rate-limit.ts, utils.ts
├─ public/       logo.svg (placeholder), images/, video/, favicon, apple-icon
├─ middleware.ts            # next-intl locale routing
├─ .env.example
├─ PLACEHOLDERS.md
└─ README.md
```

All company placeholders ([ELION GROUP LLC], ID, address, email, phone, domain) live in **`content/site.ts`**, so you replace them once and they update everywhere, including the JSON-LD and the legal pages.

---

## 4. Components

**Layout**: `Header` (transparent/solid, with a skip-to-content link), `MobileMenu` (full-screen dialog), `Footer`, `Container`, `Section` (ground: white/ivory/charcoal; spacing).
**UI primitives**: `Wordmark` (renders `/logo.svg` if present, otherwise the "ELION" text wordmark with a gold line), `Button` (primary/secondary, light/dark), `TextLink` (underline draw + arrow), `Label` (uppercase tracking, optional index number and gold rule), `GoldRule`, `Icon` set, `Field`, `Select`, `Textarea`, `Checkbox`, `Alert`.
**Motion**: `Reveal` (fade-up, reduced-motion aware), `Stagger`, `Counter`, `SlowZoom`, `HeroMedia` (video with poster, pauses offscreen, not loaded with reduced motion or Save-Data).
**Sections**: `Hero`, `PageHero`, `GroupIntro`, `KeyFigures`, `BrandsGrid`/`BrandCard`, `ValuesPillars` (grid + list variants), `LeadershipQuote`, `CtaBand`, `Story`, `MissionVision`, `GroupStructure` (SVG/HTML diagram), `LeadershipGrid`/`LeaderCard`, `Timeline`, `ContactForm`, `ContactDetails`, `WhatsAppButton`, `MapEmbed` (click-to-load), `LegalLayout`, `LegalToc`, `DraftNotice`.
**System**: `CookieBanner` + `ConsentProvider`, `JsonLd`, `LocaleSwitcher` (hidden for now).

---

## 5. SEO and performance

**SEO**
- Per-page `generateMetadata`: title template "%s — ELION GROUP", a description, a canonical URL, `alternates.languages` (hreflang, ready for ka/ar) and Open Graph/Twitter cards.
- OG images: `opengraph-image.tsx` generates a 1200×630 image for each page (ivory ground, serif title, gold rule, wordmark), so there are no stock-photo OG images.
- `sitemap.xml` covers all pages × locales; `robots.txt` allows all and points to the sitemap. Legal pages are indexable; the 404 is `noindex`.
- JSON-LD: `Organization` (legalName, url, logo, address with `addressCountry: "GE"`, contactPoint, and `subOrganization` for the brands) plus `WebSite` on Home.
- Semantic HTML: one `h1` per page, logical heading order, `<main>`, `<nav aria-label>`, `<address>`.

**Performance (target Lighthouse ≥ 95 in all four categories, mobile)**
- The hero LCP is the **poster image** (`next/image`, `priority`, AVIF, about 120KB). The video (H.264 + WebM, about 2–3MB, 1080p, 12–15s loop, muted, no audio track) is fetched only after `load`, on desktop and fast connections. It is never loaded with reduced motion or Save-Data.
- Fonts come from `next/font` (self-hosted, preloaded, `swap`, size-adjusted fallbacks so text doesn't shift), with only the weights listed above.
- Server Components by default. Client JS goes only to Header, MobileMenu, motion wrappers, ContactForm and CookieBanner. Motion uses `LazyMotion` + `domAnimation` to keep its bundle small (about 15KB).
- Images: exact `sizes`, lazy below the fold and fixed aspect ratios (CLS ≈ 0).
- The map is a click-to-load facade, so there is no third-party JS at first load. There are no analytics until consent.
- All routes are statically generated (SSG). The contact action is the only dynamic part.
- I will check with production builds (`next build && next start`) and Lighthouse at 375/768/1280/1920, plus an axe scan of every page.

---

## 6. Notes on the skills

- Loaded and used: **ui-ux-pro-max**, **refactoring-ui**, **design-taste-frontend** (this is the installed art-direction skill; **frontend-design is not installed**, so I'm applying its principles through this one). **web-design-guidelines** and **accessibility-review** are installed and will run in the final audit.
- Where a skill conflicts with your brief, **your brief wins**:
  - ui-ux-pro-max suggested teal + glassmorphism + Cinzel. I rejected these for your gold/ivory palette and its Cormorant + sans pairing.
  - design-taste-frontend discourages scroll fade-ins. You asked for subtle fade-up, so I keep it, but subtle: small offset, once only, content visible without JS, off under reduced motion.

---

## 7. Questions before I build

1. **City**: is the office in **Tbilisi** or another city (Batumi)? This sets the map centre and the address format.
2. **Hero media**: should I use a **free stock video** placeholder (Pexels/Coverr, since Unsplash has no video), or start with an **image + slow zoom** only? Image-only is safer for the 95+ score.
3. **Key figures**: which four numbers do you want? If you don't know yet, I'll use neutral facts that don't need to be true yet ("Founded 2026", "3 sectors", "Tbilisi HQ", "1 active brand") instead of invented project counts.
4. **Leadership**: should the leadership cards and quote have neutral placeholders ("[Founder Name], Founder & Chairman"), or do you have names and titles now?
5. **Brand naming**: are "Elion Real Estate" and "Elion Timepieces" final, and does Real Estate have its own site to link to (e.g. a "Visit site" link)?
6. **Map**: is **OpenStreetMap** (no cookies, recommended) acceptable, or do you prefer Google Maps?
7. **Analytics**: will you use any (Vercel Analytics, GA4)? This decides whether the cookie banner needs an Analytics toggle or only an essential-cookies notice.
8. **Timeline**: is the founding year 2026, and are there real milestones you want, or should I use placeholders?

---

## Build notes (changes from the plan)

- **i18n**: the installed Next.js 16.4 documents a native pattern (`app/[locale]` + dictionaries + `next/root-params`) that works with Cache Components. It replaces next-intl, so there is one less dependency. Locale routing lives in `proxy.ts`, which replaces the old `middleware.ts` convention.
- **Validation**: one shared plain-TypeScript validator (`lib/validation.ts`) runs on the client and the server. Zod is dropped, which keeps the client bundle smaller.
- **Header**: About · Brands · Contact. The separate "Enquire" link was dropped because it duplicated Contact.
- **Motion**: the scroll fade-up uses CSS plus one IntersectionObserver, so content stays visible without JS. Motion (Framer) drives the mobile menu, which is lazily loaded. The counters use requestAnimationFrame.
- **Hero**: an image with a slow zoom (the default answer to question 2). A video slot can be added later.
- **Leadership cards**: neutral monogram panels instead of stock faces.
- **Company data**: filled in from the registry extract (Elion Group LLC, ID 404839519, Tbilisi legal address).
- **Revision 2 (client feedback)**: added a **Team** page (leadership, group functions, how we work, careers). Fonts changed to **Marcellus** (headings, with Roman capitals for page titles) and **Inter** (body). All heroes were redesigned: a key-facts bar on Home, intro lines on the inner pages, a split hero on Contact, and a split closing band. Eight branded office and brand images were generated with Higgsfield (GPT Image 2). "Careers" was added as a contact subject.
