/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-green-hover': '#1ED760',
        'spotify-green-dim': 'rgba(29, 185, 84, 0.15)',

        // Dark glass palette
        'spotify-bg': '#050507',
        'spotify-surface': '#0a0a0f',
        'spotify-card': '#111116',
        'spotify-hover': '#1a1a22',
        'spotify-border': '#2a2a35',

        // Text palette
        'spotify-text': '#a1a1aa',
        'spotify-muted': '#63637a',
        'spotify-dim': '#44445a',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'ambient-light': 'radial-gradient(circle at 50% 0%, rgba(29, 185, 84, 0.12), transparent 70%)',
        'ambient-purple': 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08), transparent 60%)',
        'ambient-blue': 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.06), transparent 60%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-lg': '0 25px 50px rgba(0, 0, 0, 0.5)',
        'glow-green': '0 0 20px rgba(29, 185, 84, 0.3)',
        'glow-green-lg': '0 0 40px rgba(29, 185, 84, 0.4)',
        'lift': '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
