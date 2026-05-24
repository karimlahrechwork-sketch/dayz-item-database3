/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
  safelist: [
    'bg-green-900/40', 'text-green-400',
    'bg-amber-900/40', 'text-amber-400',
    'bg-orange-900/40', 'text-orange-400',
    'bg-purple-900/40', 'text-purple-400',
  ],
}
