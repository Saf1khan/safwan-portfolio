import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#E7E7E7",
        sec: "#1E1E1E",
        thr: "#D4F534",
        accent: "#D4F534",
      },
      fontFamily: {
        cabinet: ['"Cabinet Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        righteous: ['"Cabinet Grotesk"', "ui-sans-serif"], 
      },
      spacing: { "section-gap": "2.5rem" },
      zIndex: { "60": "60" },
    },
  },
  plugins: [],
};
export default config;
