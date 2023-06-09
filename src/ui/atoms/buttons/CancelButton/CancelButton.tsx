import Add from "@/ui/fondations/icons/Add"
import BaseButton from "../BaseButton/BaseButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
import { Button } from "@nextui-org/react"
interface CancelButtonProps {
	handleClick: () => void
}

const CancelButton = ({ handleClick }: CancelButtonProps) => {
	const ref = useRef(null)
	return (
		<div ref={ref}>
			<Button onPress={handleClick} color="default" variant="light">
				Annuler
			</Button>
		</div>
	)
}

export default CancelButton
