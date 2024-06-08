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
        accent2:'#ffcc4a',
        liked:'#fa2852',
        dark:'#1F1E1D',
        darker:'#181715',
        light:'#F5F5F5'
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

