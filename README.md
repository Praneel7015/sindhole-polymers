# Sindhole Polymers — Website

High-fidelity, motion-led marketing website for **Sindhole Polymers**, authorised Greentech uPVC profile dealer, Bidar, Karnataka.

Built with Next.js 16 + App Router, Tailwind CSS v4, Framer Motion, GSAP, and Lenis smooth scroll. Designed to serve fabricators, contractors, and homeowners across North Karnataka.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + CSS custom properties (design tokens) |
| Animation | Framer Motion + GSAP + Lenis |
| Forms | React Hook Form + Zod |
| Spam protection | Cloudflare Turnstile |
| Email | Resend |
| File uploads | Uploadthing |
| Analytics | Cloudflare Web Analytics (cookieless) |
| Deployment | Vercel (recommended) or Netlify |

---

## Getting started

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Install dependencies
```bash
pnpm install
```

### Set up environment variables
```bash
cp .env.example .env.local
```
Fill in the values — see the table below for where to get each key.

### Run locally
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000).

### Build for production
```bash
pnpm build
```

---

## Environment variables

| Variable | Required | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Yes | [resend.com](https://resend.com) → API Keys |
| `LEAD_EMAIL` | Yes | Your inbox — default `polymers@sindhole.com` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | [dash.cloudflare.com/turnstile](https://dash.cloudflare.com) → Create widget |
| `TURNSTILE_SECRET_KEY` | Yes | Same Turnstile widget → Secret Key |
| `UPLOADTHING_TOKEN` | Yes | [uploadthing.com](https://uploadthing.com) → Create app |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Optional | Cloudflare dashboard → Web Analytics |

> **Dev mode:** Turnstile is skipped if `TURNSTILE_SECRET_KEY` is not set (non-production only). Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` (the Cloudflare test key) in `.env.local` for local testing — it always passes.

---

## Resend setup

1. Sign up at [resend.com](https://resend.com) and verify your domain (`sindhole.com`).
2. Add a DNS record per Resend's instructions (MX / TXT / DKIM — usually 2–3 records via your registrar or Cloudflare DNS).
3. Create a **Sending Address**: `leads@polymers.sindhole.com` (or any address on your verified domain).
4. Update `FROM_EMAIL` in `lib/server.ts` to match your verified sender.
5. Generate an API key in Resend dashboard → API Keys, paste into `.env.local`.

---

## Cloudflare Turnstile setup

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** (left sidebar).
2. Click **Add site** → enter `polymers.sindhole.com` → choose **Managed** widget type.
3. Copy **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env.local`.
4. Copy **Secret Key** → `TURNSTILE_SECRET_KEY` in `.env.local`.

For local testing, use the Cloudflare testing keys:
- Site key: `1x00000000000000000000AA`
- Secret key: `1x0000000000000000000000000000000AA`

---

## Uploadthing setup

1. Sign up at [uploadthing.com](https://uploadthing.com).
2. Create a new app → name it e.g. "sindhole-polymers".
3. Copy the **API Token** from the dashboard → `UPLOADTHING_TOKEN` in `.env.local`.

---

## Deploying to Vercel

1. Push to a GitHub/GitLab repository.
2. Import into [vercel.com](https://vercel.com) → New Project → connect your repo.
3. In **Environment Variables**, add all the variables from `.env.example`.
4. Deploy. Vercel will auto-detect Next.js and configure everything.
5. Set up your custom domain: Vercel dashboard → Domains → add `polymers.sindhole.com`.
6. Add the CNAME record in your DNS:
   ```
   polymers.sindhole.com  CNAME  cname.vercel-dns.com
   ```
   (or follow the exact record Vercel shows you in the domain settings)

---

## Google Search Console setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add property → **URL prefix** → enter `https://polymers.sindhole.com`.
3. Verify via **HTML tag** method: add the meta tag to `app/layout.tsx`:
   ```tsx
   export const metadata = {
     verification: { google: "YOUR_VERIFICATION_CODE" },
   };
   ```
4. Request indexing of `https://polymers.sindhole.com/sitemap.xml` via the **Sitemaps** section.

---

## Content management

All editable content lives in `/content/`:

| File | What it controls |
|---|---|
| `content/products.ts` | Product series specs, chips, and descriptions |
| `content/finishes.ts` | Finish colours and hex values |
| `content/faq.ts` | FAQ questions and answers |
| `content/resources.ts` | Brochure/datasheet links (add Google Drive URLs when available) |
| `content/meta.ts` | Site-wide contact info, business hours, social links |

To add a Google Drive link to a resource: set the `url` field in `content/resources.ts` to the shareable Google Drive URL (set sharing to "Anyone with the link can view").

---

## Project structure

```
app/
  layout.tsx               # Root layout, fonts, metadata, CF Analytics
  page.tsx                 # Homepage (all sections)
  not-found.tsx            # Custom 404
  sitemap.ts               # Auto-generated sitemap.xml
  robots.ts                # robots.txt
  faq/
    page.tsx               # FAQ page (server — metadata + JSON-LD)
    FaqClient.tsx          # FAQ interactive accordion (client)
  products/
    [slug]/page.tsx        # Product detail pages (52mm, 60mm, 80mm)
  legal/
    privacy/page.tsx       # Privacy Policy
    distributor/page.tsx   # Authorised Distributor / Copyright notice
  api/
    enquiry/route.ts       # POST — main enquiry form → Resend
    contact/route.ts       # POST — quick contact form → Resend
    fabricator/route.ts    # POST — fabricator application → Resend
    callback/route.ts      # POST — callback request → Resend
    uploadthing/route.ts   # GET/POST — file upload handler (Uploadthing)

components/
  layout/
    Header.tsx             # Sticky nav + mobile menu
    Footer.tsx             # Dark footer with sitemap grid
    WhatsAppFab.tsx        # Floating WhatsApp button
  motion/
    Reveal.tsx             # Scroll-triggered reveal + stagger wrappers
    Counter.tsx            # Animated number counter
    SmoothScroll.tsx       # Lenis smooth scroll provider
  sections/
    Hero.tsx               # Hero with kinetic headline + window SVG
    WhyGreentech.tsx       # 6-block value proposition
    ProductRanges.tsx      # Interactive product cards
    CrossSectionExplorer.tsx  # Interactive uPVC profile cross-section
    Performance.tsx        # Animated counters + performance pillars
    FinishPicker.tsx       # Colour/finish selector with live preview
    Sectors.tsx            # Application sectors
    Sustainability.tsx     # Lifecycle + sustainability facts
    Certifications.tsx     # ISO / DIMEX / Lead-free certs
    ForFabricators.tsx     # Fabricator-targeted section
    About.tsx              # About Sindhole Polymers
    Resources.tsx          # Downloads & resources
    Enquiry.tsx            # Multi-step enquiry form (RHF + Zod + Turnstile)
    Contact.tsx            # Contact info + Google Map

content/                   # All editable site data (TypeScript)
lib/
  schemas/forms.ts         # Zod validation schemas (shared client+server)
  seo.ts                   # Metadata helpers + JSON-LD generators
  server.ts                # Resend client + Turnstile verifier
  uploadthing.ts           # Uploadthing router definition
```

---

## Greentech image credits

Where Greentech product imagery is used on this site, it is sourced from publicly available Greentech uPVC India Pvt. Ltd. materials with attribution noted in the component. All Greentech imagery rights remain with Greentech uPVC India Pvt. Ltd.

---

© 2025–{new Date().getFullYear()} Sindhole Polymers
