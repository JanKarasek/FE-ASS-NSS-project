/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	prefix: 'tw-',
	content: ['./index.html', './src/**/*.{vue,js,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Be Vietnam Pro'],
			},
			colors: {
				'mendelu-green': '#77BE13',
				'light-grey': '#EDEDED',
				'very-dark-grey': '#2C2C2C',
				'dark-grey': '#525252',
			},
		},
	},
	plugins: [],
};
