import BButton from "../BButton/BButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
import Add from "@/ui/fondations/icons/Add"
import { Button } from "@nextui-org/react"
interface SaveButtonProps {
	handleClick: () => void
}

const SaveButton = ({ handleClick }: SaveButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton onClick={handleClick} color="primary" variant="shadow">
				Sauvegarder
			</BButton>
		</div>
	)
}

export default SaveButton
