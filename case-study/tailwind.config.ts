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
        plum: {
          DEFAULT: "#3D2B4C",
          50: "#f5f0f8",
          100: "#e8ddf0",
          200: "#d4bee3",
          300: "#b690cd",
          400: "#9561b5",
          500: "#7a3f9c",
          600: "#633082",
          700: "#4e2468",
          800: "#3D2B4C",
          900: "#2a1e36",
        },
        primary: "var(--foreground)",
        secondary: "#6B6B6B",
        tertiary: "#707070",
        surface: "#FAF9FA",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
