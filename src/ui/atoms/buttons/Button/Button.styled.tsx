import colored from "@/utils/colored"
import { Button } from "@nextui-org/react"
import { css, styled } from "styled-components"
import { BButtonProps } from "./Button"

interface SButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "color"> {
	color?: string
}

export const BButtonContainer = styled.div`
	height: fit-content;
`

// @ts-ignore
export const SButton = colored(styled(
	({ color, ...otherProps }: SButtonProps) => (
		// @ts-ignore
		<Button {...otherProps}>{otherProps.children}</Button>
	)
)`
	--nextui-hover-opacity: 1;
	transition: all 0.2s ease-in-out;
	min-width: fit-content;
	${({ isDisabled }) =>
		isDisabled &&
		`
		cursor: not-allowed !important;
	`}

    &:hover {
		${({ isDisabled }) => !isDisabled && "transform: scale(1.05);"}
		--nextui-radius-large: 0rem;
		--nextui-radius-medium: 0rem;
		--nextui-radius-small: 0rem;
	}
	
	${({ variant, isDisabled }: any) => {
		if (variant === "bordered") {
			return css`
				border-color: var(--color) !important;
				color: var(--color) !important;
			`
		}
		if (variant === "light") {
			return css`
				color: var(--color) !important;
			`
		}
		return css`
			background-color: var(--color) !important;
			color: var(--text-color) !important;
			&:hover {
				${
					!isDisabled &&
					`
						background-color: hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) + 5%)) !important;
						border-color: hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) + 15%)) !important;
					`
				}
			}
			${!isDisabled && ``}
		`
	}}
`)
