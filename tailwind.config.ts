import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    colors: {
      ...colors,
      main_green: "#D0D38F",
      dark_green: "#929464",
      beige: "#feffea",
      light_yellow: "#fdffd6",
      white: "#ffffff",
      dark_blue: "#1b263b",
      twitter_blue: "#1da1f2",
      facebook_blue: "#3b5998",
      google_red: "#dd4b39",
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
