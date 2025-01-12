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
        primary01: "#98FFBB",
        primary02: "#46FF85",
        primary03: "#35E15B",
        primary04: "#009E36",
        gray01: "#202021",
        gray02: "#4A4A4C",
        gray03: "#CED1D6",
        gray04: "#F5F5F6",
        gray05: "#ACACB6",
        warning: "#FF3333",
      },
      width: {
        layout: "var(--min-layout-size)",
        "fill-available": "-webkit-fill-available",
      },
      maxWidth: {
        layout: "var(--min-layout-size)",
        "layout-calc": "calc(var(--min-layout-size) - 2rem)",
      },
      height: {
        textbox: "var(--textbox-height)",
      },
      minHeight: {
        inherit: "inherit",
      },
      maxHeight: {
        textbox: "var(--textbox-height)",
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
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(-1rem)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.23s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
