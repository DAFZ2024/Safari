/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canopy: '#1A2E1F',
        moss: '#4A7C59',
        khaki: '#D4C5A9',
        coral: '#E8613C',
        'deep-forest': '#0F1A12',
        bark: '#2C1A0E',
        sand: '#F0E8D6',
        volcanic: '#2A2018',
        coast: '#1A3A4A',
        grassland: '#8B7355',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float-card 5s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};