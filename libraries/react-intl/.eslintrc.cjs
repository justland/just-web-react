module.exports = {
	env: {
		jest: true
	},
	overrides: [
		{
			extends: ['plugin:harmony/ts-prettier'],
			files: ['*.ts', '*.tsx'],
			plugins: ['formatjs'],
			parserOptions: {
				EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
			},
			rules: {
				'@typescript-eslint/require-await': 'off',
				'formatjs/enforce-id': [
					'error',
					{
						idInterpolationPattern: '[sha512:contenthash:base64:6]'
					}
				]
			}
		}
	]
}
