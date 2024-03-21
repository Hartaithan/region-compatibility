import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['tailwind.config.js'],
}, {
  rules: { 'no-unused-vars': 'error' },
})
