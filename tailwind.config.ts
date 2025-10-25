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
        background: '#F8F9FA',           // Clean, very light Cool Gray
        'primary-dark': '#1F2937',       // Deep, near-black Charcoal
        'accent-blue': '#4F46E5',        // Vibrant, sophisticated Cobalt Blue
        'card-bg': '#FFFFFF',            // Clean, crisp White
        'border-soft': '#E5E7EB',        // Subtle light gray
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
