import colored from "@/utils/colored"
import { Button } from "@nextui-org/react"
import { styled } from "styled-components"

interface SButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "color"> {
	color?: string
}

export const SButton = colored(styled(
	({ color, ...otherProps }: SButtonProps) => (
		<Button {...otherProps}>{otherProps.children}</Button>
	),
)`
    --nextui-colors-primary: var(--color) !important;
    --nextui-colors-primaryShadow: var(--color) !important;
`)
