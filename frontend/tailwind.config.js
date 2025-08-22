/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          'primary': '#0f0f23',
          'secondary': '#1a1a2e',
          'tertiary': '#16213e',
          'card': '#1e1e3f',
        },
        'text': {
          'primary': '#e2e8f0',
          'secondary': '#94a3b8',
          'muted': '#64748b',
        },
        'accent': {
          'primary': '#6366f1',
          'secondary': '#8b5cf6',
          'hover': '#7c3aed',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'spin-slow': 'spin 1s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}