import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// @astrojs/sitemap emits a sitemap-index.xml that only POINTS to sitemap-0.xml.
// This copies the generated sitemap-0.xml (the actual <urlset> of every page)
// to /sitemap.xml so opening it shows the URLs directly — still auto-fresh,
// never hand-maintained. Runs after sitemap() in build:done.
function flatSitemap() {
  return {
    name: 'flat-sitemap',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const src = [
          join(root, 'sitemap-0.xml'),
          join(root, 'client', 'sitemap-0.xml'),
        ].find(existsSync);
        if (!src) {
          console.warn('[flat-sitemap] sitemap-0.xml not found; skipping');
          return;
        }
        const dest = src.replace(/sitemap-0\.xml$/, 'sitemap.xml');
        copyFileSync(src, dest);
        console.log(`[flat-sitemap] ${src} -> ${dest}`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://iwanstepanova.com',
  base: '/',
  integrations: [sitemap(), flatSitemap()],
  prefetch: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
