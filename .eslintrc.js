module.exports = {
  root: true,
  // all configs (eslint-config-xxx) go here:
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // contains rules that specifically require type information
    'plugin:prettier/recommended',
  ],
  // all plugins (eslint-plugin-xxx) go here:
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],

  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    // should be removed further
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',

    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    'no-async-promise-executor': 'warn',
    '@typescript-eslint/require-await': 'warn',
  },
};
