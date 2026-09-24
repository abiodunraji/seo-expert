// The sitemap must be generated at build time from the pages that exist, with
// a lastmod that tells the truth: the date of the last commit that touched the
// page or the shared layout/components it is rendered through. Today
// public/sitemap.xml is a hand-maintained file whose nine dates were typed on
// 2026-07-20 and never moved, although the contact page and the footer changed
// two days later. Search engines ignore a lastmod that never changes.
//
// Run with: npm test   (astro build, then this file)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITE = 'https://iwanstepanova.com';

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

// The date a URL was last changed: its page file, or anything shared that
// every page is rendered through. YYYY-MM-DD, committer date, as git records it.
function lastChanged(pageFile) {
  const own = git('log', '-1', '--format=%cs', '--', pageFile);
  const shared = git('log', '-1', '--format=%cs', '--', 'src/layouts', 'src/components');
  return own > shared ? own : shared;
}

function expectedUrls() {
  const out = new Map();
  for (const f of readdirSync(join(root, 'src/pages')).sort()) {
    if (!f.endsWith('.astro') || f === '404.astro') continue;
    const name = f.replace(/\.astro$/, '');
    const url = name === 'index' ? `${SITE}/` : `${SITE}/${name}/`;
    out.set(url, lastChanged(`src/pages/${f}`));
  }
  return out;
}

function parseSitemap(xml) {
  const urls = new Map();
  const re = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = re.exec(xml))) {
    const loc = /<loc>\s*([^<\s]+)\s*<\/loc>/.exec(m[1]);
    const lastmod = /<lastmod>\s*([^<\s]+)\s*<\/lastmod>/.exec(m[1]);
    assert.ok(loc, `a <url> without a <loc>: ${m[1]}`);
    urls.set(loc[1], lastmod ? lastmod[1].slice(0, 10) : null);
  }
  return urls;
}

test('the sitemap is generated at build time, not kept by hand', () => {
  assert.ok(!existsSync(join(root, 'public/sitemap.xml')),
    'public/sitemap.xml still exists: a hand-maintained file would shadow the generated one');
  assert.ok(existsSync(join(root, 'dist/sitemap.xml')), 'dist/sitemap.xml is missing after astro build');
});

test('sitemap.xml is one flat urlset that lists every page once, and nothing else', () => {
  const xml = readFileSync(join(root, 'dist/sitemap.xml'), 'utf8');
  assert.match(xml, /<urlset[\s>]/, 'the root element must be <urlset>');
  assert.doesNotMatch(xml, /<sitemapindex/, 'a sitemap index that only points at another file is not accepted');
  const got = parseSitemap(xml);
  const want = expectedUrls();
  assert.deepEqual([...got.keys()].sort(), [...want.keys()].sort());
  assert.equal(want.size, 9, 'the site has nine public pages today; if that changed, this line is the one to update');
});

test('every lastmod is the date of the last commit that changed that page or the shared layout', () => {
  const got = parseSitemap(readFileSync(join(root, 'dist/sitemap.xml'), 'utf8'));
  const want = expectedUrls();
  for (const [url, date] of want) {
    assert.equal(got.get(url), date, `lastmod for ${url}`);
  }
});

test('robots.txt still points at /sitemap.xml', () => {
  const robots = readFileSync(join(root, 'public/robots.txt'), 'utf8');
  assert.match(robots, /^Sitemap:\s*https:\/\/iwanstepanova\.com\/sitemap\.xml\s*$/m);
});
