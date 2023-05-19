import BaseButton from "../BaseButton/BaseButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
import Add from "@/ui/fondations/icons/Add"
interface SaveButtonProps {
	handleClick: () => void
}

const SaveButton = ({ handleClick }: SaveButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BaseButton onClick={handleClick} color="emerald700" auto>
				Sauvegarder
			</BaseButton>
		</div>
	)
}

export default SaveButton
