/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
	useTabs: true,
};

module.exports = config;
