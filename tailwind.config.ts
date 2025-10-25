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
        background: '#F5F5DC',           // Warm, elegant Beige
        'primary-dark': '#2F4F4F',       // Deep Dark Slate Gray
        'accent-emerald': '#009B77',     // Rich, vibrant Emerald Green
        'card-bg': '#FFFFFF',            // Clean white for cards
        'border-soft': '#E5E5E5',        // Subtle border
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
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,155,119,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,155,119,0.6), 0 0 60px rgba(0,155,119,0.4)' },
        }
      }
    },
  },
  plugins: [],
}

export default config
