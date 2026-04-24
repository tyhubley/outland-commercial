import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FE4C02',
          bright: '#FE4C02',
          hover: '#E53F00',
          soft: '#FFF1EA',
        },
        ink: {
          DEFAULT: '#2B473B',
          deep: '#1E3128',
          muted: '#475569',
          subtle: '#64748B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '72px', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-lg': ['56px', { lineHeight: '56px', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-md': ['48px', { lineHeight: '48px', fontWeight: '600', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
