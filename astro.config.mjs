import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://iwanstepanova.com',
  base: process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true' ? '/seo-expert/' : '/',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  prefetch: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
});