import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  stylistic: true,
  react: true,
  typescript: true,
  rules: {
    'unused-imports/no-unused-vars': 'error',
    'jsonc/sort-keys': 'off',
    'unicorn/prefer-number-properties': 'off',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
  },
})
