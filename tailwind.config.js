/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        brand: "var(--color-brand)",
        tertiary: "var(--color-tertiary)",
        error: "var(--color-error)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
