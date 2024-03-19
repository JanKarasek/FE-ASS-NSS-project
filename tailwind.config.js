/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Be Vietnam Pro"],
      },
    },
  },
  plugins: [],
};
