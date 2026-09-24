import { defineConfig } from 'astro/config';
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://iwanstepanova.com';

// The date a URL was last changed: its page file, or anything shared that
// every page is rendered through (the layout / footer). YYYY-MM-DD, as git
// records the committer date.
function lastChanged(root, pageFile) {
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const own = git('log', '-1', '--format=%cs', '--', pageFile);
  const shared = git('log', '-1', '--format=%cs', '--', 'src/layouts', 'src/components');
  return own > shared ? own : shared;
}

// Generates sitemap.xml into the build output directory from the pages that
// actually exist, dated from git, so lastmod tells the truth instead of
// being a hand-typed date that never moves.
const sitemap = {
  name: 'sitemap',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(new URL('.', import.meta.url));
      const outDir = fileURLToPath(dir);
      const pagesDir = join(root, 'src/pages');

      const urls = readdirSync(pagesDir)
        .filter((f) => f.endsWith('.astro') && f !== '404.astro')
        .sort()
        .map((f) => {
          const name = f.replace(/\.astro$/, '');
          const loc = name === 'index' ? `${SITE}/` : `${SITE}/${name}/`;
          const lastmod = lastChanged(root, `src/pages/${f}`);
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
        });

      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

      writeFileSync(join(outDir, 'sitemap.xml'), xml);
    },
  },
};

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

  integrations: [sitemap],
});
