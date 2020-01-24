module.exports = {
	parserOptions: { ecmaVersion: 2017, sourceType: 'module' },
	extends: ['eslint:recommended', 'prettier', 'plugin:jest/recommended'],
	plugins: ['prettier', 'jest'],
	rules: { 'prettier/prettier': ['error'] },
	env: {
		browser: true,
		node: true,
		mocha: false,
		jest: false,
		'jest/globals': true
	},
}
