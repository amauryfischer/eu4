import Add from "@/ui/fondations/icons/Add"
import BButton from "../BButton/BButton"
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
			<BButton onPress={handleClick} color="default" variant="light">
				Annuler
			</BButton>
		</div>
	)
}

export default CancelButton
