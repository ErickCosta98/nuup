/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nevada: {
          '50': '#f5f6f6',
          '100': '#e5e7e8',
          '200': '#cdd0d4',
          '300': '#aab0b6',
          '400': '#808890',
          '500': '#656d76',
          '600': '#565c64',
          '700': '#4a4e54',
          '800': '#414449',
          '900': '#393b40',
          '950': '#242528',
      },
      },
    
    },
  },
  plugins: [],
}

