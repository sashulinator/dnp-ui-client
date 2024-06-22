module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  endOfLine: 'auto',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  sortingMethod: 'alphabetical',
  importTypeOrder: ['NPMPackages', 'localImports'],
  plugins: ['./node_modules/prettier-plugin-sort-imports/dist/index.2.js'],
}
