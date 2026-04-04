/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3C210C',
        'primary-light': '#6B4F36',
        neutral: {
          900: '#1A1410',
          700: '#4A3F35',
          500: '#99917E',
          300: '#D4CFC7',
          100: '#F5F3F0',
        },
        accent: '#C8A882',
        surface: '#FFFFFF',
        'surface-alt': '#FAF8F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(60, 33, 12, 0.08)',
        'medium': '0 4px 16px rgba(60, 33, 12, 0.12)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'amber-glow': 'amberGlow 2.4s linear infinite',
        'radar-pulse': 'radarPulse 3s ease-out infinite',
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
        amberGlow: {
          '0%':   { boxShadow: '6px 0 22px rgba(200,168,130,0.55), -6px 0 10px rgba(184,115,51,0.18)' },
          '25%':  { boxShadow: '0 6px 22px rgba(200,168,130,0.55), 0 -6px 10px rgba(184,115,51,0.18)' },
          '50%':  { boxShadow: '-6px 0 22px rgba(200,168,130,0.55), 6px 0 10px rgba(184,115,51,0.18)' },
          '75%':  { boxShadow: '0 -6px 22px rgba(200,168,130,0.55), 0 6px 10px rgba(184,115,51,0.18)' },
          '100%': { boxShadow: '6px 0 22px rgba(200,168,130,0.55), -6px 0 10px rgba(184,115,51,0.18)' },
        },
        radarPulse: {
          '0%':   { transform: 'scale(0.85)', opacity: '0.5' },
          '60%':  { transform: 'scale(1.15)', opacity: '0' },
          '100%': { transform: 'scale(1.15)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};