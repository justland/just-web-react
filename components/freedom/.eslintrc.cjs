module.exports = {
	env: {
		jest: true
	},
	parserOptions: {
		sourceType: 'module'
	},
	overrides: [
		{
			extends: ['plugin:harmony/ts-prettier', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
			},
			rules: {
				'@typescript-eslint/require-await': 'off',
				'harmony/ts-member-delimiter-style': 'off',
				'react/prop-types': 'off',
				'no-use-before-define': 'off',
			},
			settings: {
				react: {
					version: 'detect'
				}
			}
		},
		{
			extends: ['plugin:storybook/recommended'],
			files: ['*.stories.tsx', '*.mdx'],
			rules: {
				'no-console': 'off',
				'import/no-anonymous-default-export': 'off',
				'react/jsx-key': 'off'
			}
		}
	]
}
