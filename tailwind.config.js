/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    "./index.html",
      "./src/App.vue",
      "./src/views/**/*.{vue,js,ts,jsx,tsx}",
      "./src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro']
      }
    },
  },
  plugins: [],
}

