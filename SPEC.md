# SPEC.md — IWAN STEPANOVA | SEO EXPERT

## Project Overview

- **Project Name**: Iwan Stepanova — SEO Expert Personal Brand
- **Project Type**: Static personal brand website (Astro.js)
- **Core Functionality**: High-authority SEO consultant portfolio showcasing strategic expertise in Technical SEO, Content Architecture, GEO (Generative Engine Optimization), and off-page/local SEO services
- **Target Users**: Small businesses seeking premium SEO services — the site must appeal through agency-level polish

---

## 1. Architecture & Tech Stack

- **Framework**: Astro.js 5.x (Static Site Generation only)
- **Styling**: Tailwind CSS 4.x + custom brutalist design tokens
- **UI Components**: Shadcn UI (Astro-compatible via React islands)
- **Animations**: Framer Motion (via React islands) or pure CSS for static builds
- **Content Management**: Astro Content Collections (.md/.mdx)
- **Hosting**: Vercel (Iwan's preference shown in brief)

### Build Constraints

- Static HTML only (no SSR)
- Lighthouse target: 100/100
- All interactive elements must work without JavaScript where possible; JS only for progressive enhancement
- Semantic HTML: `<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<section>`

---

## 2. Visual Design System — "Jonno"Method

### Design Principles

- **Modern Brutalist** meets **Retro‑Tech**
- Heavy 1–2px solid borders
- Hard shadows (no blur) on interactive elements
- Aggressive, commanding typography
- Grid‑first brutalist layouts
- "Not‑AI‑slop" authenticity

### Color Palette

| Role                 | Color         | Hex       |
| -------------------- | ------------- | --------- |
| Background (Primary) | Oxford Blue   | `#1B263B` |
| Accent (Primary)     | Electric Cyan | `#00F5FF` |
| Text (Primary)       | Off‑White     | `#F8FAFC` |
| Text (Muted)         | Slate Gray    | `#94A3B8` |
| Surface              | Deep Navy     | `#162032` |
| Border               | Electric Cyan | `#00F5FF` |
| Error                | Crimson       | `#DC2626` |
| Success              | Emerald       | `#10B981` |

### Typography

| Element          | Font Family        | Weight          | Size (Desktop) | Size (Mobile) |
| ---------------- | ------------------ | --------------- | -------------- | ------------- |
| Hero Title       | **Space Grotesk**  | 800 (ExtraBold) | 72px – 128px   | 40px – 56px   |
| Section Headings | **Space Grotesk**  | 700 (Bold)      | 48px – 64px    | 32px – 40px   |
| Subheadings      | **Space Grotesk**  | 600 (SemiBold)  | 24px – 32px    | 20px – 24px   |
| Body Text        | **Inter**          | 400 (Regular)   | 16px – 18px    | 14px – 16px   |
| UI / Labels      | **JetBrains Mono** | 500 (Medium)    | 12px – 14px    | 12px          |
| Accent Text      | **Space Grotesk**  | 600 (SemiBold)  | 14px – 16px    | 12px – 14px   |

### Spacing System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Container max-width: 1280px
- Section padding: 96px (desktop), 48px (mobile)
- Card padding: 24px – 32px

### Brutalist Visual Effects

| Element           | Treatment                                  |
| ----------------- | ------------------------------------------ |
| Borders           | 1px–2px solid #00F5FF (Electric Cyan)      |
| Interactive Cards | Hard shadow: `4px 4px 0 #00F5FF` (no blur) |
| Buttons           | Hard shadow on hover, scale transform      |
| Section Dividers  | Thick 2px cyan borders                     |
| Grid Gaps         | 0px (borders create visual separation)     |
| Focus States      | 2px offset outline in Electric Cyan        |

---

## 3. Page Structure

### Page 1 — Home (`/`)

**Hero Section**

- Headline (Dutch): "De Strategische Architect voor Zoekmachine Dominantie"
- Subtitle: "Technical SEO, Content Architectuur & GEO voor de merken van morgen"
- Professional photo placeholder (right-aligned, full-height on desktop)
- CTA button: "Start je Project" → `/contact`

**Services Bento Grid**

- 7 brutalist cards in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile):
  1. Strategie
  2. Analyse
  3. Content
  4. Technical SEO
  5. Off‑page SEO
  6. Local SEO
  7. **GEO** (Generative Engine Optimization) — highlighted accent card
- Each card: icon + title + brief description, hard shadow hover effect

**Client Logo Wall**

- Grayscale client logos in Marquee or static grid
- Lazy-loaded images with Intersection Observer

**CTA Area**

- Headline: "Laten we praten over jouw groei"
- Button → `/contact`

**Footer**

- Oversized scrolling marquee: "IWAN STEPANOVA" (or static large text)
- Velora branding in bottom corner
- Navigation links

### Page 2 — Service Detail (`/services/[slug]`)

**Layout (all pages share brutalist theme)**

- Hero: Service name + overview subtitle
- Section: "Wat houdt het in?" — description
- Section: "Aanpak" — process/steps
- Section: "Gerelateerde Case Studies" — linked case studies
- CTA: "Interesse? Laten we praten"

**Content Source**

- Astro Content Collections: `/content/services/*.md` or `*.mdx`

### Page 3 — Case Study Detail (`/cases/[slug]`)

**Layout**

- Hero: Client name + result highlights (e.g., "+247% traffic")
- Challenge / Solution / Results grid
- Metrics showcase
- Testimonial (optional)
- Related services

**Content Source**

- Astro Content Collections: `/content/cases/*.md` or `*.mdx`

---

## 4. Site Navigation

```
Home        → /
Services    → /services
Cases      → /cases
Over Iwan  → /over
Contact   → /contact
```

- Sticky header with brutalist border-bottom
- Mobile: full-screen overlay menu with large typography

---

## 5. Components List

| Component           | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `SEO.astro`         | Reusable meta tags + JSON-LD ProfessionalService |
| `BaseLayout.astro`  | `<html>`, `<head>`, `<body>`, fonts, global CSS  |
| `Header.astro`      | Site navigation                                  |
| `Footer.astro`      | Marquee + Velora branding                        |
| `Hero.astro`        | Reusable hero section                            |
| `ServiceCard.astro` | Bento grid service cards                         |
| `CaseCard.astro`    | Case study preview cards                         |
| `Button.astro`      | Brutalist CTA buttons                            |
| ` BentoGrid.astro`  | Grid container for cards                         |
| `Marquee.astro`     | Scrolling text component                         |
| `Section.astro`     | Consistent section wrapper                       |

---

## 6. SEO & Metadata

### Global SEO (`SEO.astro`)

```html
<!-- Per-page -->
<title>{title} | Iwan Stepanova — SEO Expert</title>
<meta name="description" content="{description}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:type" content="website" />
<link rel="canonical" href="{canonicalURL}" />
```

### JSON‑LD ProfessionalService Schema

Injected in `BaseLayout.astro`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Iwan Stepanova",
  "description": "Technical SEO, Content Architecture & GEO consultant",
  "url": "https://iwansrepub.nl/",
  "areaServed": "Nederland",
  "priceRange": "€€€€"
}
```

---

## 7. Content Collections Schema

### Services Collection (`/content/services/*.md`)

```typescript
// src/content/config.ts
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(), // Lucide icon name
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});
```

### Cases Collection (`/content/cases/*.md`)

```typescript
const cases = defineCollection({
  type: 'content',
  schema: z.object({
    client: z.string(),
    title: z.string(),
    summary: z.string(),
    results: z.array(z.object({ metric: z.string(), value: z.string() })),
    date: z.date(),
    featured: z.boolean().default(false),
  }),
});
```

---

## 8. Animation & Interactions

### Reveal-on-Scroll

- CSS `animation-delay` with Intersection Observer
- Elements fade‑up with `translateY(20px) → translateY(0)` on scroll
- Staggered delays for grid items (50ms increments)

### Hover Transitions

- Duration: **300ms** (instantaneous feel)
- Card hover: translate(-2px, -2px), hard shadow expands
- Button hover: background swap to Electric Cyan, text to Oxford Blue

### Marquee

- Pure CSS animation: `translateX(-50%)` infinite linear loop
- No JavaScript required

---

## 9. Acceptance Criteria

| #   | Criteria                                                        | Validation                   |
| --- | --------------------------------------------------------------- | ---------------------------- |
| 1   | Static build (`npm run build`) completes without errors         | Build output in `dist/`      |
| 2   | All pages render semantic HTML (`<main>`, `<article>`, `<nav>`) | `npm run preview` + DevTools |
| 3   | Lighthouse Performance ≥ 100                                    | Chrome DevTools > Lighthouse |
| 4   | Color palette matches spec (#1B263B, #00F5FF, #F8FAFC)          | Visual inspection            |
| 5   | Typography uses Space Grotesk + Inter + JetBrains Mono          | Computed styles              |
| 6   | Borders are 1–2px solid Electric Cyan                           | DevTools                     |
| 7   | Hard shadows (no blur) on interactive elements                  | DevTools                     |
| 8   | Services Bento Grid displays 7 cards                            | Page render                  |
| 9   | Footer marquee scrolls or displays large text                   | Page render                  |
| 10  | SEO component injects meta + JSON‑LD                            | Page source                  |
| 11  | Content editable via Markdown files                             | Create test `.md` file       |
| 12  | Mobile responsive (single column below 768px)                   | Resize browser               |

---

## 10. File Tree

```
seo-expert/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── iwan-placeholder.jpg
│       └── clients/
├── src/
│   ├── components/
│   │   ├── Button.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── BentoGrid.astro
│   │   ├── ServiceCard.astro
│   │   ├── CaseCard.astro
│   │   ├── Marquee.astro
│   │   └── SEO.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── services/
│   │   │   ├── strategie.md
│   │   │   ├── analyse.md
│   │   │   ├── content.md
│   │   │   ├── technical-seo.md
│   │   │   ├── offpage-seo.md
│   │   │   ├── local-seo.md
│   │   │   └── geo.md
│   │   └── cases/
│   │       └── .gitkeep
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ServiceLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── cases/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── SPEC.md
└── README.md
```

---

## 11. Developer Notes

> **"Vibe Coding" Workflow**
>
> 1. Study the Webflow reference screenshots (Clarion Project, MyAgency‑WBS‑MIW, BornToSlay, YoungBlunt)
> 2. Note border‑widths, typography scale, box‑model spacing
> 3. Translate to Tailwind utility classes: `border-2 border-[#00F5FF]`, `shadow-[4px_4px_0_#00F5FF]`
> 4. Replicate brutalist spirit — avoid generic "modern startup" aesthetics
> 5. This site should feel like it was built by someone who **actually gives a damn**
