/** @type {import("prettier").Config} */
module.exports = {
  useTabs: false,
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
