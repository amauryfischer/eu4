import { useRef } from "react"
import { useHoverDirty } from "react-use"
import BButton, { BButtonProps } from "../BButton/BButton"

const SaveButton = (props: BButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton color="primary" variant="shadow" {...props}>
				Sauvegarder
			</BButton>
		</div>
	)
}

export default SaveButton
