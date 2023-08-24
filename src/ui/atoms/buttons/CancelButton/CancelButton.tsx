import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"

const CancelButton = (props: BButtonProps) => {
	const ref = useRef(null)
	return (
		<div ref={ref}>
			<BButton color="default" variant="light" {...props}>
				Annuler
			</BButton>
		</div>
	)
}

export default CancelButton
