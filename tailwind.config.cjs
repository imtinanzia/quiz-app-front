/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  media: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1430px'
      },
    },
    extend: {
      colors: {
        'true-gray': colors.neutral,
        primary: '#FF0000',
        secondary: '#6E4AFF',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        headingOne: '52px',
        headingTwo: '44px',
        headingThree: '36px',
        headingFour: '24px',
        headingFive: '22px',
        headingSix: '20px',
        leadPara: '19px',
        regularPara: '18px',
        smallPara: '16px',
        xsmallPara: '14px',

      },

      lineHeight: {
        main: '43.88px',
        secondary: '26px',
        tri: '21px',
        leadHeight: '140%',
        regularHeight: '18px',
        smallHeight: '15px',
        11: '3.5rem',
        12: '5rem',
      },
      lineHeight: {
        11: '3.5rem',
        12: '5rem',
      },
      backgroundImage: {
        "gradiant-one": 'linear-gradient(180deg, #09031F 61.92%, #E30001 210.39%)',
        "gradiant-two": 'linear-gradient(180deg, #09031F 27.21%, #E30001 223.06%)'
      },
      boxShadow: {
        card: '10px 20px 40px -4px rgba(0, 0, 0, 0.08)',
        x2: ' 0px 0.588011px 4.11608px rgba(0, 0, 0, 0.18)',
        x3: "30px 30px 40px -4px rgba(0, 0, 0, 0.04)"
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  experimental: {
    applyComplexClasses: true,
  },
};
