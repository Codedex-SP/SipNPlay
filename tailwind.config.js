/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'nunito' : ['Nunito', 'sans-serif'],
        'press-start' : ['Press Start 2P', 'cursive']
      }
    },
  },
  plugins: [],
}