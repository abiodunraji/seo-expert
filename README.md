# iwanstepanova.com

Persoonlijke-merk portfolio in Astro, opgezet als een zoekresultatenpagina in je eigen huisstijl. Statische site, elke pagina een eigen route en eigen HTML-bestand.

## Draaien

```bash
npm install
npm run dev        # lokaal op http://localhost:4321
npm run build      # productie-output in /dist
npm run preview    # /dist lokaal bekijken
```

Node 18+ aanbevolen.

## Structuur

```
public/            robots.txt, sitemap.xml, _redirects, favicon, /fonts, /images
src/layouts/       Base.astro   (head, meta, OG, JSON-LD graaf + breadcrumbs, GTM + consent, footer, cookiebanner)
src/components/    SerpHeader, PageTop, Footer, CookieBanner
src/pages/         index, maps, overview, ervaring, diensten, local-seo, seo-content, contact, privacy, 404
src/styles/        global.css
```

Routes: `/`, `/maps`, `/overview`, `/ervaring`, `/diensten`, `/local-seo`, `/seo-content`, `/contact`, `/privacy`, plus `/404`.

## Wat je zelf nog invult

1. **Profielfoto.** Vervang `public/images/iwan.png` door je eigen foto (ongeveer vierkant tot staand, minimaal 240x300). Er staat nu een tijdelijke placeholder in.
2. **OG-afbeelding.** Zet je bestaande `og-default.jpg` in `public/images/` voor de social-preview.
3. **Contactformulier.** In `src/pages/contact.astro` staat een Web3Forms-formulier met placeholder `JOUW-WEB3FORMS-KEY`. Vervang die door je eigen access key (web3forms.com), of hang er je eigen backend aan. De boekingslink werkt al.

## GTM, GA4 en Consent Mode v2

Je container `GTM-PZXB5GSC` zit al in `Base.astro`. Consent Mode v2 staat standaard op denied voor analytics en advertising, en op granted voor functionaliteit en beveiliging. De cookiebanner zet consent op granted zodra iemand accepteert, en onthoudt de keuze in localStorage. Je GA4-tag in GTM respecteert die consent automatisch.

## Schema

De JSON-LD zit in `Base.astro` als een gekoppelde graaf: een Person (jij, met expertise en profielen), een ProfessionalService (je bedrijf, met telefoon, adres en werkgebied) en een WebSite, aan elkaar geknoopt via @id. Die graaf staat site-breed. Daarbovenop krijgt elke subpagina een BreadcrumbList, en local-seo en seo-content krijgen elk een FAQPage. De homepage heeft geen breadcrumb.

## Sitemap

Een schone `public/sitemap.xml` met alle URL's, geen sitemap-index. Voeg je later pagina's toe, werk dit bestand dan bij. `robots.txt` verwijst ernaar en zet de AI-crawlers expliciet open.

## Migratie van je huidige site (exacte stappen)

Je huidige site is al Astro op Cloudflare Pages, en dit is hetzelfde domein. Het is dus een vervanging van de deploy, geen domeinverhuizing. Laag risico, mits de redirects kloppen.

1. Assets overzetten. Zet je eigen `iwan.png` en `og-default.jpg` in `public/images/`. Neem eventuele andere bestaande assets die je wilt houden ook mee.
2. Redirects. `public/_redirects` bevat al de 301's voor de gewijzigde paden: `/over` naar `/ervaring` en `/diensten/voor-bureaus` naar `/diensten`. Blijven ongewijzigd: `/`, `/diensten`, `/contact`, `/privacy`. Nieuw: `/overview`, `/local-seo`, `/seo-content`, `/maps`. Rankt er nog een oude URL die verdwijnt, voeg dan een regel toe: `/oude-url  /nieuwe-url  301`.
3. Deployen naar Cloudflare Pages. Push dit project naar je repo en koppel het aan Cloudflare Pages, framework-preset Astro, build command `npm run build`, output directory `dist`. Of upload de `dist`-map direct. Zet het custom domain `iwanstepanova.com` op deze deploy; DNS en SSL laat je staan.
4. AI-crawlers vrijgeven. Dit is waarom Claude je huidige site niet kon bekijken en Gemini wel: in Cloudflare staat vrijwel zeker "Block AI bots" aan. Zet die blokkade uit of op do-not-block voor dit domein. `robots.txt` zet de AI-crawlers al expliciet open. Controleer daarna dat een AI-tool de live site kan lezen.
5. Search Console. Na livegang `https://iwanstepanova.com/sitemap.xml` (opnieuw) indienen en voor de belangrijkste pagina's een herindexering aanvragen.
6. Schema vergelijken. De graaf in `Base.astro` is rijker dan de losse ProfessionalService op je huidige site. Neem deze over, of voeg samen wat je zeker wilt houden.
7. Nalopen na deploy. Controleer per steekproef: bron-HTML bevat de JSON-LD, elke pagina heeft eigen title, description en canonical, de sitemap laadt, de 404 werkt, en de cookiebanner verschijnt en zet consent correct om.

## Kaart

De Maps-pagina gebruikt Leaflet met OpenStreetMap, geladen vanaf cdnjs. Dat werkt live meteen. Wil je geen externe bron, dan kun je de kaart vervangen of de Maps-tab weghalen (link in `SerpHeader.astro`).
