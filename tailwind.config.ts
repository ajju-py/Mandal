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
        bhagwa: {
          50: "#FFF8F0",
          100: "#FEEDDC",
          200: "#FDD4B1",
          300: "#FBB47F",
          400: "#F98E4B",
          500: "#FF6F00", // Deep saffron festival flag
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#451406",
        },
        maroon: {
          50: "#FDF2F4",
          100: "#FBE6E9",
          200: "#F6C8CF",
          300: "#EE9DAA",
          400: "#E3677A",
          500: "#9E1B32",
          600: "#800B22",
          700: "#6B091B",
          800: "#550715",
          900: "#3D030D",
          950: "#240107",
        },
        festive: {
          cream: "#FFFDF9",
          paper: "#FAF4EB",
          sand: "#F5ECE0",
          charcoal: "#1C1917",
          gold: "#D97706",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        festive: "0 10px 25px -5px rgba(234, 88, 12, 0.15), 0 8px 10px -6px rgba(128, 11, 34, 0.1)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
