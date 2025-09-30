/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        scrollbar: false,
        colors: {
          primary: {
            50:  '#f0f3f6', // very light
            100: '#d9e0e8',
            200: '#b8c5d4',
            300: '#97aabf',
            400: '#67859e',
            500: '#2C3E50', // base color
            600: '#243546',
            700: '#1c2b3a',
            800: '#15222e',
            900: '#0d161f', // darkest shade
          },
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          accent: '#3b82f6',
          neutral: {
            50: '#f8f9fa',
            100: '#e9ecef',
            200: '#dee2e6',
            300: '#ced4da',
            400: '#adb5bd',
            500: '#6c757d',
            600: '#495057',
            700: '#343a40',
            800: '#2a2a2a',
            900: '#1a1a1a',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Poppins', 'system-ui', 'sans-serif'],
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.6s ease-out',
          'fade-in': 'fadeIn 0.4s ease-out',
          'scale-in': 'scaleIn 0.3s ease-out',
          'slide-in-right': 'slideInRight 0.5s ease-out',
          'bounce-gentle': 'bounceGentle 2s infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'confetti': 'confetti 0.8s ease-out',
        },
        keyframes: {
          fadeInUp: {
            '0%': {
              opacity: '0',
              transform: 'translateY(30px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          scaleIn: {
            '0%': {
              opacity: '0',
              transform: 'scale(0.9)',
            },
            '100%': {
              opacity: '1',
              transform: 'scale(1)',
            },
          },
          slideInRight: {
            '0%': {
              opacity: '0',
              transform: 'translateX(30px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateX(0)',
            },
          },
          bounceGentle: {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
          },
          confetti: {
            '0%': {
              transform: 'scale(0) rotate(0deg)',
              opacity: '1',
            },
            '100%': {
              transform: 'scale(1) rotate(720deg)',
              opacity: '0',
            },
          },
        },
        boxShadow: {
          'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 25px -5px rgba(0, 0, 0, 0.1)',
          'glow': '0 0 20px rgba(246, 133, 31, 0.3)',
          'glow-strong': '0 0 30px rgba(246, 133, 31, 0.5)',
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
  }
  