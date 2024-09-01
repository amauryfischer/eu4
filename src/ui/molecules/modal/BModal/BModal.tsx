import { Modal } from "@nextui-org/react"
import { StyledModal } from "./BModal.styled"
import Button from "@/ui/atoms/buttons/Button"
import CloseIcon from "@mui/icons-material/Close"

const BModal = ({
	children,
	...props
}: {
	children: React.ReactNode
} & React.ComponentProps<typeof Modal>) => {
	return (
		<StyledModal
			{...props}
			closeButton={
				<Button
					variant="light"
					isIconOnly
					aria-label="Close"
					onClick={() => {
						props.onClose?.()
					}}
					startContent={<CloseIcon />}
				/>
			}
		>
			{children}
		</StyledModal>
	)
}

export default BModal
