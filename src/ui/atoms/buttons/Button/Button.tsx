import type { Button as NextUIButton } from "@nextui-org/react";
import { SButton } from "./Button.styled";

export interface ButtonProps
	extends Omit<React.ComponentProps<typeof NextUIButton>, "color"> {
	color?: string;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return <SButton {...props}>{children}</SButton>;
};

export default Button;
