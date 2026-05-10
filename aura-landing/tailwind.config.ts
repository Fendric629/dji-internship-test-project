import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(0, 210, 255, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config
