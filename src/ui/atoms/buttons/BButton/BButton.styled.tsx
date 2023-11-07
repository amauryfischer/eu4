import colored from "@/utils/colored"
import { Button } from "@nextui-org/react"
import { css, styled } from "styled-components"
import { BButtonProps } from "./BButton"

interface SButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "color"> {
	color?: string
}

export const BButtonContainer = styled.div`
	height: fit-content;
`

export const SButton = colored(styled(
	({ color, ...otherProps }: SButtonProps) => (
		<Button {...otherProps}>{otherProps.children}</Button>
	),
)`
	transition: all 0.2s ease-in-out;
	${({ isDisabled }) =>
		isDisabled &&
		`
		cursor: not-allowed !important;
	`}
    &:hover {
		${({ isDisabled }) => !isDisabled && `transform: scale(1.05);`}
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
					`background-color: hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) - 10%)) !important;`
				}
			}
		`
	}}
`)
