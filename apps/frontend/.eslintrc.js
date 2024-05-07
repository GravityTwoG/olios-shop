module.exports = {
  // all configs (eslint-config-xxx) go here:
  extends: [
    '../../.eslintrc.js',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'next',
    'next/core-web-vitals',
  ],
  // all plugins (eslint-plugin-xxx) go here:
  plugins: ['@next/eslint-plugin-next'],
  parserOptions: {
    project: 'tsconfig.json', // tells parser relative path of tsconfig.json
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },

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

  rules: {
    'react/no-children-prop': 'off',
    'react/display-name': 'off',
    'react/no-string-refs': 'off',
  },
};
