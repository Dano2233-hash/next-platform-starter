/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#050505',
          800: '#0a0a0a',
          700: '#121212',
          600: '#1a1a1a',
        },
        navy: {
          900: '#0a0d14',
          800: '#0f141d',
          700: '#161d29',
        },
        accent: {
          cyan: '#00e5ff',
          purple: '#7000ff',
          blue: '#0066ff',
        }
      }
    },
  },
  plugins: [],
}
