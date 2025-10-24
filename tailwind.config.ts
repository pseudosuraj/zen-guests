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
        primary: {
          DEFAULT: "#111827",  // Deep charcoal
        },
        accent: {
          green: "#10B981",    // Vibrant modern green
        },
        text: {
          light: "#D1D5DB",    // Soft light gray for text on dark
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
