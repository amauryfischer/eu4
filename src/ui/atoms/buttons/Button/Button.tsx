import type { Button as NextUIButton } from "@nextui-org/react";
import { SButton } from "./Button.styled";
import React from "react"
import { ColoredProps } from "@/utils/colored"

export interface ButtonProps
	extends Omit<React.ComponentProps<typeof NextUIButton>, "color"> {
	color?: string;
}

const Button = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof NextUIButton> & ColoredProps
>((props, ref) => {
	return <SButton ref={ref} {...props} />
})

export default Button;
