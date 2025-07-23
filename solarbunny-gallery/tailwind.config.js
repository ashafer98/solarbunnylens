/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryText: '#383659',  // dark blue-ish for text
        darkBg: '#272640',       // very dark blue for header/footer background
        lightBg: '#FFFFFF',      // white background
        accent: '#CF655E',       // warm red/orange for buttons and CTAs
        accentHover: '#D93654',  // brighter red for hover/alerts
      },
      fontWeight: {
        bold: '700',
      },
    },
  },
  plugins: [],
}
