import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"
import { useHoverDirty } from "react-use"
import Manage from "@/ui/fondations/icons/Manage"

const ManageButton = (props: BButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="purple700"
				variant="bordered"
				{...props}
				startContent={<Manage color="purple700" isHovering={isHovering} />}
			>
				{props.title}
			</BButton>
		</div>
	)
}

export default ManageButton
