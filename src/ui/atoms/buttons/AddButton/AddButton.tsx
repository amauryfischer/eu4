import Add from "@/ui/fondations/icons/Add"
import BaseButton from "../BaseButton/BaseButton"
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
			<BaseButton
				onPress={handleClick}
				color="primary"
				startIcon={<Add color="grey100" isHovering={isHovering} />}
			>
				{label}
			</BaseButton>
		</div>
	)
}

export default AddButton
