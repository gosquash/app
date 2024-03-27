/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["prettier"],
	env: {
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2023,
		project: "./tsconfig.json",
	},
	plugins: ["prettier"],

	rules: {
		"prettier/prettier": "error",
		"no-console": "warn",
	},
};
