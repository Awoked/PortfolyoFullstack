import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "color-1": "#1e1e1e",
        "color-dashboard-text": "#080906",
        "dashboard-background": "#F3F4F0",
        "dashboard-primary": "#95DBFE",
        "dashboard-secondary": "#DBD0DD",
        "dashboard-accent": "#B62F89"
      },
    },
    container: {
      padding: "1.5rem",
      center: true,
    },
  },
  plugins: [],
};
export default config;
