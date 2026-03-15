import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        winGrey: "#C0C0C0",
        winNavy: "#000080",
        lavender: "#A29BFE",
      },
      boxShadow: {
        pixel: "2px 2px 0 #000",
      },
      fontFamily: {
        system98: ["MS Sans Serif", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

