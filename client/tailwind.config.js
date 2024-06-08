/** @type {import('tailwindcss').Config} */
export default {
  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:
      {
        accent:'#faa214',
        liked:'#fa2852',
        dark:'#1F1E1D',
        darker:'#181715',
        light:'#F5F5F5'
      },
      colorsLight:
      {
        accent:'#faa214',
        liked:'#fa2852',
        dark:'#F5F5F5',
        darker:'#FFFFFF',
        light:'#1F1E1D'
      },
      "keyframes": {
        "shimmer": {
          "100%": {
            "transform": "translateX(100%)",
          },
        },
      }
    },
  },
  plugins: [],
}

