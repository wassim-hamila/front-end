/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7ffe5',
          100: '#efffcc',
          200: '#deff99',
          300: '#cdff66',
          400: '#c5ff00',
          500: '#a0d600',
          600: '#7bad00',
          700: '#568400',
          800: '#315b00',
          900: '#0c3200',
        },
        neon: {
          green: '#c5ff00',
          dark: '#a0d600',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 30px rgba(197, 255, 0, 0.3)',
        'glow-lg': '0 0 60px rgba(197, 255, 0, 0.4)',
        'success-glow': '0 0 30px rgba(16, 185, 129, 0.3)',
        'danger-glow': '0 0 30px rgba(239, 68, 68, 0.3)',
        'neon-green': '0 0 20px rgba(197, 255, 0, 0.5), 0 0 40px rgba(197, 255, 0, 0.3)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}