
import plugin from "tailwindcss";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  darkMode: 'selector',
  daisyui: {
      themes: ["light","luxury", "disable"],
  },
  plugins: [
      require("daisyui"),
  ],
};



export default config;
