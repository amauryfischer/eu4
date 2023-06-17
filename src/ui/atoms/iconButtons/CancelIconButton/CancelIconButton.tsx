import { useHoverDirty } from "react-use"
import BaseButton from "../../buttons/BaseButton/BaseButton"
import { useRef } from "react"
import Cancel from "@/ui/fondations/icons/Cancel"

const CancelIconButton = ({
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
				onClick={handleClick}
				color="red"
				startIcon={
					<Cancel color="red" isHovering={isHovering} strokeWidth="1.2rem" />
				}
				variant="bordered"
				isIconOnly
			>
				{children}
			</BaseButton>
		</div>
	)
}

export default CancelIconButton
