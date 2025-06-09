/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'copper-rose': '#B87333',
        'platinum': '#898B8D',
        'lab-white': '#FEFEFE',
        'warm-grey': '#F8F6F4',
        'deep-charcoal': '#2C2C2C',
      },
      fontFamily: {
        'playfair': ['mencken', 'serif'],
        'inter': ['aktiv-grotesk', 'sans-serif'],
        'dm-sans': ['aktiv-grotesk', 'sans-serif'],
        'crimson': ['sabon', 'serif'],
        'cormorant': ['mencken', 'serif'],
      },
    },
  },
  plugins: [],
}