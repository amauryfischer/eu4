import { useHoverDirty } from "react-use"
import BaseButton from "../../buttons/BaseButton/BaseButton"
import { useRef } from "react"
import Save from "@/ui/fondations/icons/Save"

const SaveIconButton = ({
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
				color="emerald"
				startIcon={
					<Save color="white" isHovering={isHovering} strokeWidth="1.2rem" />
				}
				variant="shadow"
				isIconOnly
			>
				{children}
			</BaseButton>
		</div>
	)
}

export default SaveIconButton
