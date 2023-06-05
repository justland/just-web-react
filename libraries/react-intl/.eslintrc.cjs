module.exports = {
	env: {
		jest: true
	},
	plugins: ['formatjs'],
	overrides: [
		{
			extends: ['plugin:harmony/ts-prettier'],
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
			},
			rules: {
				'@typescript-eslint/require-await': 'off'
			}
		}
	]
}
