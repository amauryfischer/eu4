import { Modal } from "@nextui-org/react"
import { StyledModal } from "./BModal.styled"

const BModal = ({
	children,
	...props
}: {
	children: React.ReactNode
} & React.ComponentProps<typeof Modal>) => {
	return <StyledModal {...props}>{children}</StyledModal>
}

export default BModal
