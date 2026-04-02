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
        navy: {
          DEFAULT: "#0B1F3A",
          light: "#112850",
          dark: "#071529",
        },
        pink: {
          DEFAULT: "#E91E8C",
          light: "#F040A0",
          dark: "#C0176E",
        },
        slate: "#4A5568",
        border: "#E2E8F0",
        success: "#059669",
        warning: "#D97706",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        heading: ["Manrope", "sans-serif"],
        body: ["Lato", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "count-up": "countUp 2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
