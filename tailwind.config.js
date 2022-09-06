const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		'./src/components/**/*.{ts,tsx,js,jsx}',
		'./src/pages/**/*.{ts,tsx,js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				default: colors.gray,
			},
		},
	},
	variants: {},
	plugins: [],
};
