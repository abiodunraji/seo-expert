// Tailwind 3 is wired through PostCSS here (Astro 6 dropped the @astrojs/tailwind
// integration, whose peer range stops at Astro 5). tailwindcss auto-discovers
// tailwind.config.mjs; autoprefixer adds vendor prefixes. Same pipeline the
// integration used — keeps every existing @tailwind/@apply rule in global.css working.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
