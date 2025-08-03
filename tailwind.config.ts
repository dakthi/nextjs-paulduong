import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "700",
              fontSize: "2.5rem",
              letterSpacing: "-0.02em",
            },
            p: {
              color: "#444",
              fontSize: "1.1rem",
              lineHeight: "1.75",
            },
            ul: {
              color: "#444",
              fontSize: "1.1rem",
              lineHeight: "1.60",
              textAlign: "left",
            },
            a: {
              color: "#3b82f6",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            code: {
              backgroundColor: "#f3f4f6",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              textAlign: "left",
            },
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
