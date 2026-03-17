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
        brandBlue: '#0B5ED7',
        brandOrange: '#F97316',
        brandSoft: '#EFF6FF'
      },
      boxShadow: {
        card: '0 10px 30px rgba(11, 94, 215, 0.12)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(120deg, rgba(11,94,215,0.8), rgba(249,115,22,0.5))'
      }
    }
  },
  plugins: []
};

export default config;
