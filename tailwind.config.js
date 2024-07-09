/** @type {import('tailwindcss').Config} */


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
      backgroundImage: {
        'primaryBgGradient': "linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)",
      },
      colors: {
        ring: 'var(--ring)',
        primaryBg: 'var(--primary-bg)',

        iconPrimaryHover: 'hsl(var(--icon-primary-foreground))',
        iconSecondaryHover: 'hsl(var(--icon-secondaty-foreground))',
        iconBgHover: 'hsl(var(--icon-foreground))',

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

