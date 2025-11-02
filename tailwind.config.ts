import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Premium Theme Colors
        'background': '#F7F3EE',           // Warm Beige/Oat Milk
        'card-bg': '#FFFFFF',              // Crisp White
        'accent-teal': '#008080',          // Vibrant Teal for subtle accents (use bg-accent-teal, text-accent-teal)
        'primary-violet': '#6366F1',       // Zen-Guests violet for main accent (matches homepage)
        'primary-violet-light': '#EEF2FF', // Light violet card backgrounds, highlights
        'text-primary': '#2F2F2F',         // Deep Charcoal
        'text-secondary': '#4B5563',       // Slightly lighter for supporting text
        'border-soft': '#E5E7EB',          // Soft border color
      },
    },
  },
  plugins: [],
};
export default config;
