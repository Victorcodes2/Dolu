/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF7EA',
          100: '#FCE9C5',
          200: '#F9D49F',
          300: '#F5BE79',
          400: '#F1A853',
          500: '#D97706', // Amber Gold
          600: '#B05E04',
          700: '#884703',
          800: '#602F02',
          900: '#381801',
        },
        accent: {
          50: '#F5EFFE',
          100: '#E9D7FC',
          200: '#D3AFF9',
          300: '#BE87F6',
          400: '#A85FF3',
          500: '#9333EA', // Royal Purple
          600: '#762ABB',
          700: '#59208D',
          800: '#3B155E',
          900: '#1E0B30',
        },
        background: '#FDF6F0', // Soft Beige
        text: '#1F2937', // Dark Slate
        success: '#10B981', // Bright Mint
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom-sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'custom-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};