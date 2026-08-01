/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        rose: {
          50: '#FFF1F6',
          100: '#FFE1EC',
          200: '#FFC4DA',
          300: '#FF9BC0',
          400: '#FF6BA3',
          500: '#FF3D8B',
          600: '#EE1E72',
          700: '#C2185B',
          800: '#941146',
          900: '#6B0C33',
        },
        grape: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        cream: '#FDF2F6',
        ink: '#3B1F2E',
      },
      boxShadow: {
        soft: '0 18px 40px -22px rgba(194, 24, 91, 0.35)',
        lift: '0 30px 60px -28px rgba(194, 24, 91, 0.45)',
        glow: '0 12px 30px -10px rgba(255, 61, 139, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
    },
  },
  plugins: [],
};
