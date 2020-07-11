module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  env: {
    browser: true,
  }
}
