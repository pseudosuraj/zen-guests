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
        background: '#FEFBF6',           // Warm, elegant Cream
        'text-primary': '#3D3C3A',       // Professional dark Taupe
        'accent-terracotta': '#E07A5F',  // Warm, inviting Terracotta
        'card-bg': '#FFFFFF',            // Clean, crisp White
        'border-soft': '#F3EFEA',        // Very subtle border
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
