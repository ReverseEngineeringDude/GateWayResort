/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0F172A',
        'primary-light': '#1E293B',
        'primary-dark': '#0B1120',
        'secondary': '#FBBF24',
        'accent': '#E5E7EB',
        'glass': 'rgba(255, 255, 255, 0.25)',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'lato': ['"Lato"', 'sans-serif'],
      },
      blur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
