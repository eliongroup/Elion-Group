# Placeholders to replace

Everything below is a stand-in. Items marked **(one file)** update across the whole site.

## 1. Company details — `content/site.ts` (one file)

| Field | Current value | Status |
|---|---|---|
| `legalName` | Elion Group LLC | ✅ from registry extract |
| `registrationNumber` | 404839519 | ✅ from registry extract |
| `registrationDate` | 16 November 2026 | ✅ from registry extract |
| `registry` | LEPL National Agency of Public Registry | ✅ from registry extract |
| `address` | 12 Nikoloz Baratashvili St / 2 Sanapiro St, Floor 2, Krtsanisi District, Tbilisi | ✅ legal address — confirm it is also the office address shown to visitors |
| `governingBodies` | General Meeting, Directorate | ✅ from registry extract |
| `map` (lat/lng) | 41.6912, 44.8088 | ⚠ approximate — verify the pin on openstreetmap.org |
| `email` | `info@eliongroup.co` | ⚠ set up this mailbox on the domain (or change the address) |
| `phoneDisplay` / `phoneHref` | `[+995 XXX XX XX XX]` / `+995000000000` | ❌ placeholder (also drives the WhatsApp link) |
| `domain` | `eliongroup.co` | ✅ set; use `NEXT_PUBLIC_SITE_URL=https://eliongroup.co` in Vercel |
| `hours` | `[Monday – Friday, 10:00 – 18:00]` | ❌ placeholder |
| `legalRepresentative` | `[DIRECTOR NAME]` | ❌ placeholder (Legal Notice) |
| `legalUpdated` | `[DATE]` | ❌ set when legal texts are approved |
| `social` | empty | add profiles when they exist (also feeds JSON-LD `sameAs`) |

## 2. Copy — `dictionaries/en.ts`

- `home.quote.name` — `[Founder Name]` (and confirm the quote text with the person quoted)
- `team.functions`, `team.culture` — confirm the four group functions and the working principles
- `about.timeline.items` — `[2027]` for Elion Timepieces; confirm all milestones
- `home.intro.figures`: 9 markets / 4 regions / 1 point of contact. Only verifiable figures are shown. Add **m² under development** and **partner developers** as soon as they are real (the row takes 3 items; remove all items to hide it)
- `divisions[].proof` in `dictionaries/en-business.ts`: optional fact under a business card. Only Elion Partners has one (its investor service). Add one to Real Estate or Timepieces only when a real project or brand can be named
- The WhatsApp buttons (contact page and the closing "Begin a conversation" band) use `phoneHref` in `content/site.ts`, so they **do not work until the real number is set**

## 3. Logo

Drop the SVG at **`public/logo.svg`**. It is picked up automatically at build time (header, mobile menu, footer); on dark backgrounds it is rendered white via a CSS filter. If you have a dedicated light version, tell me and I'll wire it in. Also replace `app/icon.svg` (favicon, gold-and-charcoal "E" placeholder).

## 4. Photographs — `public/images/` (replace the file, keep the name)

### AI-generated brand imagery (Higgsfield · GPT Image 2 and Cinema Studio 2.5)

All images on the site were generated for ELION GROUP. They are **illustrative visualisations, not photographs of real premises, projects or people**. Replace them with real photography when it exists, and do not present them as a real building in press or investor material.

| File | Used in | Shows |
|---|---|---|
| `hero-tbilisi.jpg` | **Home hero** | An illuminated limestone tower beside Tbilisi old town at blue hour, with the Narikala fortress and the Mtkvari river |
| `tbilisi-sunset.jpg` | About hero | Tbilisi at sunset, with the Holy Trinity Cathedral and the fortress lit in gold beside the tower |
| `team-boardroom.jpg` | Team hero | The leadership team in golden backlight around an architectural model (no faces visible) |
| `leadership-tbilisi.jpg` | Home leadership quote | A leader in a navy suit, seen from behind, looking out over the old town |
| `office-lobby.jpg` | Home "The Group" section | Travertine reception with brass ELION GROUP lettering |
| `office-library.jpg` | About "Our Story" | Private library with a view of the city at dusk |
| `office-executive.jpg` | Team "How we work" | Executive office at night over Tbilisi |
| `office-boardroom.jpg` | Contact hero, Elion Partners hero and card | Boardroom with an ELION GROUP plaque |
| `office-lounge.jpg` | Closing "Begin a conversation" band (Home, About, Team) | Client lounge at golden hour with a view of the Narikala fortress |
| `invest-tbilisi.jpg` | Investment Guide hero, home Investment section | Golden-hour view over a new Tbilisi residential district, the river and the Caucasus |
| `hero-facade.jpg` | Elion Real Estate hero, Investment Guide developers section, contact map preview | Stone headquarters entrance at dusk with ELION GROUP engraved |
| `brand-real-estate-residence.jpg` | Elion Real Estate card | Limestone residence at dusk with planted terraces and a reflecting pool |
| `brand-timepieces-atelier.jpg` | Elion Timepieces card and hero | Unbranded gold watch and movement on a watchmaker's bench |
| `brand-future-ventures-caucasus.jpg` | Future Ventures card | Mountain peaks at sunrise above a sea of clouds |

The full-resolution originals are in your Higgsfield library.

### Investment Guide market images

| File | Used in | Source |
|---|---|---|
| `market-qatar.jpg` | Qatar page and card | AI-generated (Higgsfield · GPT Image 2): Doha skyline at blue hour |
| `market-uae.jpg` | UAE page and card | Unsplash: [photo-1512453979798-5ea266f8880c](https://images.unsplash.com/photo-1512453979798-5ea266f8880c), Dubai skyline |
| `market-saudi-arabia.jpg` | Saudi Arabia page and card | Unsplash: [photo-1586724237569-f3d0c1dee8c6](https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6), Riyadh |
| `market-oman.jpg` | Oman page and card | Unsplash: [photo-1621680696874-edd80ce57b72](https://images.unsplash.com/photo-1621680696874-edd80ce57b72), Muttrah Corniche, Muscat |
| `invest-tbilisi.jpg` | Georgia page and card, Investment Guide hero | AI-generated |
| `market-uk.jpg` | United Kingdom page and card | Unsplash: [photo-1513635269975-59663e0ac1ad](https://images.unsplash.com/photo-1513635269975-59663e0ac1ad), London and the Thames |
| `market-portugal.jpg` | Portugal page and card | Unsplash: [photo-1525207934214-58e69a8f8a3e](https://images.unsplash.com/photo-1525207934214-58e69a8f8a3e), Lisbon at dusk |
| `market-france.jpg` | France page and card | Unsplash: [photo-1502602898657-3e91760cbb34](https://images.unsplash.com/photo-1502602898657-3e91760cbb34), Paris and the Seine |
| `market-zanzibar.jpg` | Zanzibar page and card | Unsplash: [photo-1590523741831-ab7e8b8f9c7f](https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f), **generic tropical beach — stand-in; replace with a real Zanzibar photo (Stone Town or Nungwi)** |

The Unsplash images are free to use under the Unsplash License. Replace them with licensed or commissioned photography if you prefer.

### Investment Guide content

All nine market pages (`dictionaries/en-business.ts` → `markets`) contain general statements about foreign ownership, registration and residency. **Have each one reviewed by a qualified lawyer in that country before launch**, as rules (especially in Saudi Arabia) are changing.

Leadership cards on the **Team** page are managed in the admin panel (`/admin/team`): add each person with a 4:5 portrait. Without a photo, a gold monogram panel is shown.

When you replace an image, also update its `imageAlt` text in `dictionaries/en.ts`.

## 5. Hero video (optional)

The hero currently uses a still image with a slow zoom (best for Lighthouse). If you supply a short muted loop (12–15 s, H.264 MP4 + WebM, ≤ 3 MB), I can add it with the image as poster, loaded only after page load and never under reduced motion or Save-Data.

## 6. Legal texts — `content/legal/en.ts`

All five documents are **DRAFT – to be reviewed by a lawyer**. Bracketed items: `[24 months]` retention period, `[analytics cookie]` / `[duration]` rows (remove if no analytics), `[DATE]`.

## 7. Environment — `.env.example` → Vercel project settings

`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (sender domain must be verified in Resend).

## 8. Admin panel — team and blog (`/admin`)

Sign in at **/admin** to add, edit, reorder and hide **team members** (Team page) and to write, publish and delete **blog articles** (/blog, plus a "Latest articles" block on the home page once one is published).

Setup on Vercel, once:
1. **Storage → Create → Blob**, connect it to this project (this sets `BLOB_READ_WRITE_TOKEN`). Content and uploaded images are stored there.
2. **Settings → Environment Variables**: add `ADMIN_PASSWORD` (a long, unique password). Optionally `ADMIN_SESSION_SECRET`.
3. Redeploy.

Locally, set `ADMIN_PASSWORD` in `.env.local`; content is saved in `./.data` (ignored by git).

The Team page shows no profiles until members are added in the admin panel.
