import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  typescript: true,
  rules: {
    'unused-imports/no-unused-vars': 'error',
    'jsonc/sort-keys': 'off',
  },
})
