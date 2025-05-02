/** @type {import('tailwindcss').Config} */

export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        colors: {
          primary: '#0A2540', 
          brand: '#543AFD', 
          secondary: '#B6C0CD', 
          tertiary: '#EBEEF1',
          error: '#DC2626', 
        },
      },
    },
    darkMode: 'class',
    plugins: [],
}