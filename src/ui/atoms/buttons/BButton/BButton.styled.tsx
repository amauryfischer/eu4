import colored from "@/utils/colored"
import { Button } from "@nextui-org/react"
import { css, styled } from "styled-components"
import { BButtonProps } from "./BButton"

interface SButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "color"> {
	color?: string
}

export const SButton = colored(styled(
	({ color, ...otherProps }: SButtonProps) => (
		<Button {...otherProps}>{otherProps.children}</Button>
	),
)`
    &:hover {
		transform: scale(1.05);
	}
	${({ variant }: any) => {
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
				background-color: hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) - 15%)) !important;
			}
		`
	}}
`)
