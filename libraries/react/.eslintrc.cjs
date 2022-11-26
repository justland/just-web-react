module.exports = {
  env: {
    jest: true
  },
  overrides: [{
    extends: [
      'plugin:harmony/ts-recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime'
    ],
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
    },
    rules: {
      '@typescript-eslint/require-await': 'off',
      'harmony/ts-member-delimiter-style': 'off'
    }
  }, {
    extends: ['plugin:storybook/recommended'],
    files: ['*.stories.@(tsx|mdx)'],
    rules: {
      'no-console': 'off',
      'import/no-anonymous-default-export': 'off'
    }
  }],
};
