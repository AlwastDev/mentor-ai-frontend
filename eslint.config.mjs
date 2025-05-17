/** @type {import("eslint").Linter.Config} */
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
	...tseslint.config(eslint.configs.recommended, tseslint.configs.recommended),
	{
		ignores: ["node_modules/**/*", "dist/**/*", "**/*.json", "**/*.cjs", "**/*.js", "**/*.mjs"],
	},
	{
		plugins: {
			"unused-imports": unusedImports,
		},
		rules: {
			"no-restricted-imports": [
				"warn",
				{
					patterns: ["../../../*"],
				},
			],
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
				},
			],
			"unused-imports/no-unused-imports": "error",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-unnecessary-type-assertion": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/prefer-string-starts-ends-with": "off",
			"@typescript-eslint/array-type": "off",
			"@typescript-eslint/non-nullable-type-assertion-style": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"prefer-const": "off",
			"@typescript-eslint/consistent-indexed-object-style": "off",
			"@typescript-eslint/no-var-requires": "off",
			"import/no-anonymous-default-export": "off",
			"@typescript-eslint/no-unnecessary-type-constraint": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
		},
	},
	prettier,
];
