// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9',           // Soft, warm Off-White
        primary: {
          DEFAULT: '#2B2A4C',            // Deep, rich Indigo
          dark: '#1F1E38',
        },
        accent: {
          teal: '#008080',               // Vibrant, sophisticated Teal
          'teal-light': '#E0F2F1',       // Very light Teal for subtle backgrounds
        },
      },
      fontFamily: {
        display: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto'
        ],
        body: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '"Segoe UI"',
          'Roboto'
        ],
      },
    },
  },
  plugins: [],
}

export default config
