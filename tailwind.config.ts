// Tailwind v4 — theme is defined in CSS via @theme in globals.css
// This file kept for tooling compatibility (VSCode IntelliSense, etc.)
// Content scanning is automatic in v4; the config below is minimal.
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
