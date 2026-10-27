/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 18px 45px rgba(154, 52, 18, 0.10)',
      },
    },
  },
  plugins: [],
}
