// Base path for GitHub Pages deployment
// Empty string for root domain, '/seo-expert' for GitHub Pages project site
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return `${BASE_PATH}${path}`;
}
