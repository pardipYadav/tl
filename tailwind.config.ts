import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      colors: {
        // Divine Simparna logo palette — navy + metallic gold
        brandBlue: '#0B2548',
        brandNavy: '#0B2548',
        brandGold: '#C4A053',
        brandOrange: '#C4A053',
        brandSoft: '#F3EEE3',
        brandSoftNavy: '#E8EEF5'
      },
      boxShadow: {
        card: '0 12px 32px rgba(11, 37, 72, 0.10)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(120deg, rgba(11,37,72,0.88), rgba(11,37,72,0.55), rgba(196,160,83,0.55))'
      }
    }
  },
  plugins: []
};

export default config;
