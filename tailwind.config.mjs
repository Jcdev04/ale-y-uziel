/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        ps: "430px",
      },
      fontFamily: {
        "sf-ultralight": ["SFProUltralight", "sans-serif"],
        "sf-light": ["SFProLight", "sans-serif"],
        "sf-regular": ["SFProRegular", "sans-serif"],
        "sf-medium": ["SFProMedium", "sans-serif"],
        "sf-semibold": ["SFProSemibold", "sans-serif"],
        "sf-bold": ["SFProBold", "sans-serif"],
      },
      colors: {
        primary: "#0050EF",
        secondary: "#5D50C6",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
