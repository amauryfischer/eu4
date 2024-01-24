const { nextui } = require("@nextui-org/react")
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			defaultColorScheme: "dark",
			defaultTheme: "dark",
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: "#fff",
							50: "#e3e3e3",
							100: "#bcbcbc",
							200: "#909090",
							300: "#646464",
							400: "#3d3d3d",
							500: "#1b1b1b",
							600: "#161616",
							700: "#111111",
							800: "#0c0c0c",
						},
					},
				},
				light: {
					primary: "#000",
				},
			},
		}),
	],
}
