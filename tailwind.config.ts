import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)"
			},
			fontFamily: {
				quantico: ["var(--font-quantico)"]
			}
		}
	},
	darkMode: "class",
	plugins: [
		nextui({
			defaultTheme: "dark", // default theme from the themes object
			defaultExtendTheme: "dark", // default theme to extend on custom themes
			addCommonColors: true
		})
	]
}
export default config
