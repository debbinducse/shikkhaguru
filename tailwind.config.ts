import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#ffffff",
        muted: "#525252",
        line: "#d4d4d4",
        soft: "#f6f6f6",
        "soft-line": "#e7e7e7",
      },
      fontFamily: {
        sans: ['"Noto Sans Bengali"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        reading: "46rem",
      },
      letterSpacing: {
        label: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
