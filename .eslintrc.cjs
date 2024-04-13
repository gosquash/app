/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["prettier"],
	plugins: ["prettier", "@typescript-eslint"],

	env: {
		node: true,
		es2023: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2023,
		sourceType: "module",
		project: "./tsconfig.json",
	},

	rules: {
		"prettier/prettier": "error",
		"no-console": "warn",

		semi: ["error", "always"],
		quotes: ["error", "double"],
		"comma-dangle": ["error", "always-multiline"],
		"@typescript-eslint/comma-dangle": ["error", "always-multiline"],
		"no-unused-vars": 0,
		"@typescript-eslint/no-unused-vars": "warn",
		"quote-props": ["error", "as-needed"],
		"jsx-quotes": ["error", "prefer-double"],

		// TypeScript
		"@typescript-eslint/consistent-type-exports": [
			"warn",
			{ fixMixedExportsWithInlineTypeSpecifier: true },
		],
		"@typescript-eslint/consistent-type-imports": "warn",
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": 0,
	},
};
