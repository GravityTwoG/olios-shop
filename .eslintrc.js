module.exports = {
  // all configs (eslint-config-xxx) go here:
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // contains rules that specifically require type information
    'plugin:@next/next/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json', // tells parser relative path of tsconfig.json
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    exclude: '*.jsx',
  },

  // all plugins (eslint-plugin-xxx) go here:
  plugins: [
    '@typescript-eslint',
    '@next/eslint-plugin-next', // https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/lib/index.js
  ],

  rules: {
    'react/no-children-prop': 'off',
    'react/display-name': 'off',
    'react/no-string-refs': 'off',

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

    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    'no-async-promise-executor': 'warn',
    '@typescript-eslint/require-await': 'warn',
  },
};
