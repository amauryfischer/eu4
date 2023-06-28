import Add from "@/ui/fondations/icons/Add"
import BButton from "../BButton/BButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
import { Button } from "@nextui-org/react"
interface AddButtonProps {
	handleClick: () => void
	label: string
}

const AddButton = ({ handleClick, label }: AddButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				onPress={handleClick}
				color="primary"
				startIcon={<Add color="grey100" isHovering={isHovering} />}
			>
				{label}
			</BButton>
		</div>
	)
}

export default AddButton
