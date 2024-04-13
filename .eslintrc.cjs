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

		// TypeScript
		"@typescript-eslint/consistent-type-exports": [
			"warn",
			{ fixMixedExportsWithInlineTypeSpecifier: true },
		],
		"@typescript-eslint/consistent-type-imports": "warn",
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": 0,
	},
};
