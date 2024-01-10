/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "primary":"#854DFF",
      "secondary": {
        100: "#FFFFFF",
        200: "#F0F0F0",
        300: "#DCDCDC",
        400: "#716F6F",
        500: "#151515",
      },
      "tertiary": "#FF5959",
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

