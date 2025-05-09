import tailwindForms from '@tailwindcss/forms';
import rippleui from 'rippleui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e84118',
        'primary-dark': '#c23616',
        'secondary': '#333',
        'background': '#111',
        'card-bg': '#222',
      },
      fontFamily: {
        comfortaa: ['var(--font-comfortaa)', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
      boxShadow: {
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    tailwindForms,
    rippleui,
  ],
};