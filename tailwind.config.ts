import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        glowing: {
          '0%': { 'background-position': '0 0' },
          '50%': { 'background-position': '400% 0' },
          '100%': { 'background-position': '0 0' },
        },
      },
      animation: {
        glowing: 'glowing 20s linear infinite',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        spotify: 'rgb(59, 228, 119)',
        spot: '#1ed760',
        spb: '#121212',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(rgba(0, 0, 0, 0.85), rgb(0, 0, 0))',
      },
      maxWidth: {
        '2.8xl': '48rem'
      },
      fontSize: {
        '2.6xl': '2.6rem',
      },
    },
  },
  plugins: [],
};

export default config;