import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"

const CloseElementButton = (props: BButtonProps) => {
	const ref = useRef(null)
	return (
		<div ref={ref}>
			<BButton color="red" variant="bordered" {...props}>
				Fermer
			</BButton>
		</div>
	)
}

export default CloseElementButton
