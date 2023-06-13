module.exports = {
  plugins: [
    'simple-import-sort',
    '@typescript-eslint/eslint-plugin',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': ['error',
      { "allowDeclarations": true }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ],
    'react/display-name': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: '18',
    },
  },
}