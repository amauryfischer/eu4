import { Button } from "@nextui-org/react"
import { SButton } from "./BButton.styled"

export interface BButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "color"> {
	color?: string
}

const BButton = ({ children, ...props }: BButtonProps) => {
	return <SButton {...props}>{children}</SButton>
}

export default BButton
