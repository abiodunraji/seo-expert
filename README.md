# Iwan Stepanova — SEO Expert

Personal brand website for Iwan Stepanova, SEO Expert specializing in Technical SEO, Content Architecture, and GEO (Generative Engine Optimization).

## Tech Stack

- **Framework**: Astro.js 5.x (Static Site Generation)
- **Styling**: Tailwind CSS 4.x
- **Typography**: Space Grotesk, Inter, JetBrains Mono
- **Colors**: Oxford Blue (#1B263B), Electric Cyan (#00F5FF), Off-White (#F8FAFC)

## Design System — Brutalist

- Heavy 1–2px solid borders in Electric Cyan
- Hard shadows (no blur): `4px 4px 0 #00F5FF`
- Grid-first brutalist layouts
- Responsive: Mobile-first approach

## Project Structure

```
seo-expert/
├── src/
│   ├── components/     # UI components
│   ├── content/       # Markdown content collections
│   │   ├── services/  # Service pages (editable via Markdown)
│   │   └── cases/     # Case studies (editable via Markdown)
│   ├── layouts/       # Base and service layouts
│   ├── pages/         # Routes (index, services, cases, etc.)
│   └── styles/        # Global CSS with Tailwind
├── public/            # Static assets
├── astro.config.mjs   # Astro configuration
└── tailwind.config.mjs # Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Content Management

All content is editable via Markdown files in `/src/content/`:

- **Services**: `/src/content/services/*.md`
- **Cases**: `/src/content/cases/*.md`

### Adding a New Service

Create a new Markdown file in `/src/content/services/`:

```markdown
---
title: 'Servicenaam'
description: 'Korte beschrijving'
icon: 'iconnaam'
order: 8
featured: false
---

## Wat houdt het in?

Je content hier...

## Aanpak

1. Stap 1
2. Stap 2
3. Stap 3
```

Icons available: `target`, `chart`, `content`, `code`, `link`, `map`, `brain`

### Adding a New Case Study

Create a new Markdown file in `/src/content/cases/`:

```markdown
---
client: 'Client Naam'
title: 'Case Titel'
summary: 'Korte samenvatting'
results:
  - { metric: 'Traffic', value: '+150%' }
  - { metric: 'Conversies', value: '+80%' }
date: 2024-01-01
featured: true
---

## Uitdaging

Beschrijf de uitdaging...

## Oplossing

Beschrijf de oplossing...

## Resultaten

Beschrijf de resultaten...
```

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## SEO

The site includes:

- Reusable `SEO.astro` component for meta tags
- JSON-LD ProfessionalService schema in base layout
- Semantic HTML throughout
- Optimized for Lighthouse 100/100

## Customization

### Colors

Edit `tailwind.config.mjs` to change the color palette:

```javascript
colors: {
  oxford: '#1B263B',
  cyan: '#00F5FF',
  offwhite: '#F8FAFC',
  // ...
}
```

### Typography

Fonts are loaded via Google Fonts in `BaseLayout.astro`.

## License

Private — All rights reserved for Iwan Stepanova.
