import { useHoverDirty } from "react-use"
import BaseButton from "../BaseButton/BaseButton"
import { useRef } from "react"
import Edit from "@/ui/fondations/icons/Edit"
import Delete from "@/ui/fondations/icons/Delete"

const DeleteButton = ({
	handleClick,
	children,
}: {
	handleClick: () => void
	children?: React.ReactNode
}) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BaseButton
				onPress={handleClick}
				color="red"
				variant="shadow"
				startIcon={<Delete color="white" isHovering={isHovering} />}
				isIconOnly
			>
				{children}
			</BaseButton>
		</div>
	)
}

export default DeleteButton
