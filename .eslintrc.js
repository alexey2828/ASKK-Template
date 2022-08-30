module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": ["warn"],
    'no-console': ["warn"],
    'react-native/no-inline-styles': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};