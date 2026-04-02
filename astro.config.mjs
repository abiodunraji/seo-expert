import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://iwansrepub.nl',
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