/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/App.tsx",
      "./src/pages/*.tsx",
      "./src/pages/**/*.tsx",
      "./src/components/*.tsx",
  ],
  theme: {
    extend: {
        colors: {
            "lightgray1": "#f4f5f7",
            "darkgray1": "#ededee",
            "lightgray2": "#f6f6f6",
        }
    },
  },
  plugins: [],
}
