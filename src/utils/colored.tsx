import shadow from "@/ui/fondations/shadow"
import { ComponentType, ReactNode } from "react"
import styled, { css } from "styled-components"

type IColor =
	| "emerald"
	| "cyan"
	| "blue"
	| "red"
	| "caramel"
	| "yellow"
	| "green"
	| "brown"
	| "orange"
	| "purple"
	| "grey"
	| "white"

export interface ColoredProps {
	$backgroundColor?: IColor
	$textColor?: IColor
	$borderColor?: IColor
	$color?: IColor
	$fontSize?: string
}

const colored = (Component: ComponentType<any>) => styled(Component)<{
	color?: string
	backgroundColor?: string
	disabled?: boolean
	loading?: boolean
}>`
    ${shadow}
    --opacity: 1;
    ${({ disabled, loading }) => {
			const isDisabled = disabled || loading
			return css`
                --opacity: ${isDisabled ? "0.5" : "1"};
            `
		}}
    ${({ color: colorXXX = "caramel" }) => {
			if (!colorXXX) return ""
			const color = colorXXX?.replace(/\d+/, "")
			const xxx = colorXXX?.replace(/\D+/, "")
			let css = `
                --color-hue: var(--${color}-hue);
                --color-saturation: var(--${color}-saturation);
                --color-lightness: var(--${colorXXX}-lightness);
                --color: hsla(
                    var(--color-hue),
                    var(--color-saturation),
                    var(--color-lightness),
                    var(--opacity)
                );
            `
			// if color not same as colorxxx then analyze xxx and if xxx > 500 then text-color white, else text-color black
			if (color !== colorXXX) {
				if (Number.parseInt(xxx) > 500) {
					css += `
                        --text-color: white;
                    `
				} else {
					css += `
                        --text-color: black;
                    `
				}
			} else {
				css += `
                --text-color: var(--${color}-text-color);
            `
			}
			return css
		}};


    ${({ backgroundColor: backgroundColorXXX }) => {
			if (!backgroundColorXXX) return ""
			const backgroundColor = backgroundColorXXX?.replace(/\d+/, "")
			let css = `
                --backgroundColor-hue: var(--${backgroundColor}-hue);
                --backgroundColor-saturation: var(--${backgroundColor}-saturation);
                --backgroundColor-lightness: var(--${backgroundColorXXX}-lightness);
                --backgroundColor: hsla(
                    var(--backgroundColor-hue),
                    var(--backgroundColor-saturation),
                    var(--backgroundColor-lightness),
                    var(--opacity)
                );
            `
			if (backgroundColor !== backgroundColorXXX) {
				if (Number.parseInt(backgroundColorXXX?.replace(/\D+/, "")) > 500) {
					css += `
                        --text-color: white;
                    `
				} else {
					css += `
                        --text-color: black;
                    `
				}
			} else {
				css += `
                --text-color: var(--${backgroundColor}-text-color);
            `
			}

			return css
		}};
`

export default colored
