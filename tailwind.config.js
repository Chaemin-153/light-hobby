/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        pc: '1200px',
        tab: '696px',
        mob: '343px',
      },
      colors: {
        white: '#FFFFFF',
        black: '#171717',
        yellow: '#fed047',
        yellowHover: '#fac037',
      },
      screens: {
        mob: { max: '500px' },
        sm: { min: '500px', max: '768px' },
        md: { min: '769px', max: '1023px' },
        lg: { min: '1024px', max: '1200px' },
      },
    },
  },
  plugins: [],
};

