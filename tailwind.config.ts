import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    colors: {
      main_green: "#D0D38F",
      dark_green: "#929464",
      beige: "#feffea",
      light_yellow: "#fdffd6",
      white: "#ffffff",
    },
    fontFamily: {
      headline: ["Open Sans", "sans-serif"],
      sub_headline: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
