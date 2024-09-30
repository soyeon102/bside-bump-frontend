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
        gray03: "#CDD1D6",
        gray04: "#F5F5F6",
        home: "#F9FFF1",
      },
      width: {
        layout: "var(--min-layout-size)",
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
      },
    },
  },
  plugins: [],
};
export default config;
