/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
//    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all', // Check all variables
        args: 'after-used', // Check only the arguments used after the last one
        ignoreRestSiblings: true, // Ignore rest siblings (e.g., {...rest})
        varsIgnorePattern: '^_', // Ignore variables prefixed with "_"
        argsIgnorePattern: '^_', // Ignore arguments prefixed with "_"
      },
    ],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ]
  }
}
module.exports = config;