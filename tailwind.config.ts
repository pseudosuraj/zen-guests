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
        'background': '#FFFFFF',
        'primary-violet': '#6366F1',
        'primary-violet-light': '#EEF2FF',
        'text-primary': '#1F2937',
        'text-secondary': '#4B5563',
        'border-soft': '#E5E7EB',
      },
    },
  },
  plugins: [],
};
export default config;
