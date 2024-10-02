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
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        primary01: "#46FF85",
        primary02: "#009E36",
        primary03: "#98FFBB",
        gray01: "#202021",
        gray02: "#4A4A4C",
        gray03: "#CED1D6",
        gray04: "#F5F5F6",
      },
      width: {
        layout: "var(--min-layout-size)",
      },
      maxWidth: {
        layout: "var(--min-layout-size)",
        "layout-calc": "calc(var(--min-layout-size) - 2rem)",
      },
      minHeight: {
        inherit: "inherit",
      },
      fontSize: {
        "title-lg": [
          "1.25rem",
          {
            lineHeight: "1.4rem",
            fontWeight: "bold",
          },
        ],
        "title-sm": [
          "1.125rem",
          {
            fontWeight: "bold",
          },
        ],
      },
      boxShadow: {
        innerBorder: "inset 0 0 0 1.5px #000000",
      },
      borderRadius: {
        half: "6.25rem",
      },
      gridTemplateColumns: {
        list: "repeat(auto-fill, minmax(5rem, 1fr))",
      },
      backgroundImage: {
        result: "url('/imgs/result-background.png')",
        home: "url(/imgs/home-background.png)",
      },
    },
  },
  plugins: [],
};
export default config;
