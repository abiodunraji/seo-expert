/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        oxford: '#0A0E17',
        cyan: '#00F5FF',
        offwhite: '#F0F4F8',
        slategray: '#8892A4',
        surface: '#111827',
        'surface-light': '#1A2332',
        'cyan-dim': 'rgba(0, 245, 255, 0.1)',
        'cyan-glow': 'rgba(0, 245, 255, 0.15)',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 30px rgba(0, 245, 255, 0.1)',
        'glow-lg': '0 0 60px rgba(0, 245, 255, 0.15)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};