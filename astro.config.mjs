import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://iwanstepanova.com',
  base: import.meta.env.GITHUB_PAGES === 'true' ? '/seo-expert/' : '/',
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