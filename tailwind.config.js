/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'anti-flash-white': '#f0f2f5',
        'dark-gunmetal': '#22252c',
        'light-gray': '#d1d3d6',
        primary: '#27a6ff',
        'primary-hover': 'rgb(36,153,235)',
        'primary-disabled': 'rgba(39,166,255,0.5)',
        'outer-space': '#444A57',
        'outer-space-2': '#424447',
        cultured: '#F5F7FA',
        'cultured-2': '#f5f8f8',
        platinum: '#EAE8E5',
        skeleton: 'rgb(199,199,199)',
        lotion: '#fbfbfb',
        'philippine-gray': '#8d9095',
        'american-silver': '#cccfd6',
        'gray-x11': '#b5b8c1',
        'sunset-orange': '#fc5858',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
