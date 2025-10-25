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
        background: '#EAE8E1',           // Sophisticated light Greige
        'primary-blue': '#003153',       // Deep, rich Prussian Blue
        'accent-gold': '#B99470',        // Warm Burnished Gold/Bronze
        'card-bg': '#FFFFFF',            // Clean, crisp White
        'border-soft': '#DCDCDC',        // Subtle border
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
