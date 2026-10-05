/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#E5A93C", // Liquid Spanish Olive Oil Gold (Sol de Andalucía)
        accent: "#7CAE4B", // Fresh Andalusian Olive Leaf
        secondary: "#F5B82E", // Sun-Drenched Seville Amber
        text: "#2C2B22", // Deep Roasted Andalusian Olive Umber
        background: "#FAF5EE", // Warm Sun-Washed Mediterranean Linen
        highlight: "#FFFDF9", // Clean Alabaster Porcelain
        stroke: "#D9A74A", // Warm Golden Amber Border
        goya: {
          blue: "#004B97",
          darkblue: "#003366",
          gold: "#DDA31A",
          red: "#C8102E",
          andalusia: "#1A5C38",
        },
      },
      fontFamily: {
        serif: ["var(--font-garamond)", "ITC Garamond Condensed", "Georgia", "serif"],
        typewriter: ["var(--font-mono)", "Space Mono", "Courier Prime", "monospace"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Apercu", "sans-serif"],
      },
      borderRadius: {
        '10': '10px',
        '16': '16px',
        '20': '20px',
        '30': '30px',
      },
      boxShadow: {
        'graza': '3px 3px 0px #2C2B22',
        'graza-lg': '5px 5px 0px #2C2B22',
        'graza-hover': '0px 0px 0px #2C2B22',
      }
    },
  },
  plugins: [],
};
