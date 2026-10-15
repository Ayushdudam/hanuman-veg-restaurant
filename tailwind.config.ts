import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FDFBF7",
        "canvas-dark": "#0C0A09",
        surface: "#FFFFFF",
        "brand-amber": "#F59E0B",
        "brand-amber-light": "#FEF3C7",
        "brand-terracotta": "#D97706",
        "brand-terracotta-dark": "#B45309",
        "brand-forest": "#15803D",
        "brand-forest-light": "#DCFCE7",
        "text-main": "#1C1917",
        "text-muted": "#78716C",
        "border-warm": "#E7E5E4",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(217, 119, 6, 0.08)",
        "warm-lg": "0 10px 30px -4px rgba(217, 119, 6, 0.12)",
        glow: "0 0 25px rgba(245, 158, 11, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
