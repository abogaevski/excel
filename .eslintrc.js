module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'google'],
  rules: {
    'require-jsdoc': 'off',
    'operator-linebreak': 'off',
    'no-debugger': 'off',
  },

};
