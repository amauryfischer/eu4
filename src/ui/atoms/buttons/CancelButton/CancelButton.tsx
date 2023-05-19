import Add from "@/ui/fondations/icons/Add"
import BaseButton from "../BaseButton/BaseButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
interface CancelButtonProps {
	handleClick: () => void
}

const CancelButton = ({ handleClick }: CancelButtonProps) => {
	const ref = useRef(null)
	return (
		<div ref={ref}>
			<BaseButton onClick={handleClick} color="grey600" auto ghost>
				Annuler
			</BaseButton>
		</div>
	)
}

export default CancelButton
