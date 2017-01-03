module.exports = {
  parser: "babel-eslint",
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'import/extensions': ['error', { js: 'never' }],
  },
};
