// Base path for GitHub Pages deployment
// Empty string for root domain, '/seo-expert' for GitHub Pages project site
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  const cleanPath = path.replace(/\/$/, '');
  return BASE_PATH + cleanPath || '/';
}
