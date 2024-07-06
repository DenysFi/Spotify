/** @type {import('tailwindcss').Config} */

import { colors } from '@/constants/color.constant';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        ring: 'var(--ring)',
        iconPrimaryHover: 'hsl(var(--icon-primary-foreground))',
        iconSecondaryHover: 'hsl(var(--icon-secondaty-foreground))',


        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        textButton: {
          DEFAULT: 'hsl(var(--text-button))',
          hover: 'hsl(var(--text-button-hover))',
        },

      },
    },
  },
  plugins: [],
}

