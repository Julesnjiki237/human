/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7f7',
          100: '#dcefef',
          200: '#b8dedf',
          400: '#2f8b91',
          500: '#1a6b72',
          600: '#15575d',
          700: '#114448',
        },
        leaf: {
          50: '#f1f9f0',
          100: '#dff0dc',
          400: '#74c07f',
          500: '#5aaa6a',
          600: '#468a56',
        },
        sand: {
          50: '#faf9f6',
          100: '#f5f2ec',
          200: '#e8e0d0',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
