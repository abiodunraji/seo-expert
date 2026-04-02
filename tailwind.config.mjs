/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        oxford: '#1B263B',
        cyan: '#00F5FF',
        offwhite: '#F8FAFC',
        slategray: '#94A3B8',
        surface: '#162032',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        brutal: '4px 4px 0 #00F5FF',
        'brutal-lg': '6px 6px 0 #0000F5FF',
        'brutal-sm': '2px 2px 0 #00F5FF',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};