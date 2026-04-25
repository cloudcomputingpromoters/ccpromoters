import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:    '#0D0D0D',
          red:      '#CC1016',
          'red-dark': '#A80D12',
          white:    '#FFFFFF',

          gray:     '#F5F5F5',
          muted:    '#6B6B6B',
        },
        // Legacy tokens kept for backward compat
        navy: {
          DEFAULT: '#0D0D0D',
          light:   '#1A1A1A',
          dark:    '#000000',
        },
        slate: '#6B6B6B',
        border: '#E2E8F0',
        success: '#059669',
        warning: '#D97706',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        heading: ['Manrope', 'sans-serif'],
        body:    ['Lato', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
