import { useHoverDirty } from "react-use"
import BaseButton from "../../buttons/BaseButton/BaseButton"
import { useRef } from "react"
import Edit from "@/ui/fondations/icons/Edit"

const ModifyIconButton = ({
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
				color="grey200"
				startIcon={
					<Edit
						color="primary500"
						isHovering={isHovering}
						strokeWidth="0.6rem"
					/>
				}
				variant="light"
				isIconOnly
			>
				{children}
			</BaseButton>
		</div>
	)
}

export default ModifyIconButton
