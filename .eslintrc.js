module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: 'tsconfig.eslint.json',
      sourceType: 'module'
    },
    plugins: ["@typescript-eslint"],
    rules: {
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          }
        }
      ],
      '@typescript-eslint/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      'max-len': [
        'error',
        {
          code: 120,
          ignorePattern: '\\sfrom.*$',
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
      '@typescript-eslint/indent': ['error', 2]
    }
  }