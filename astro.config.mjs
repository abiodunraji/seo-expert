import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://iwanstepanova.com',
  base: '/',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
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
