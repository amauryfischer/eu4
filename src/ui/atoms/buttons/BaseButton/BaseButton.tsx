import { Button } from "@nextui-org/react"
import { SButton } from "./BaseButton.styled"

interface BaseButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "color"> {
	color?: string
}

const BaseButton = ({ children, ...props }: BaseButtonProps) => {
	return <SButton {...props}>{children}</SButton>
}

export default BaseButton
