import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://iwanstepanova.com',

  // GitHub Pages has no server-side redirect rules (no _redirects / .htaccess),
  // so Astro generates a static redirect page (meta-refresh + canonical) at each
  // old path. These cover the live URLs that changed or were removed in the
  // redesign, preserving bookmarks and the SEO value of the old pages.
  //   old live URL            -> new target
  redirects: {
    '/over': '/ervaring',
    '/voorwaarden': '/',
    '/diensten/local-seo': '/local-seo',
    '/diensten/local-seo-audit': '/diensten',
    '/diensten/voor-bureaus': '/diensten',
  },

  build: {
    inlineStylesheets: 'always',
  },
});
