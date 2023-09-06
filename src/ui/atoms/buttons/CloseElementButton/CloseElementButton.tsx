import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"
import Cancel from "@/ui/fondations/icons/Cancel"
import { useHoverDirty } from "react-use"
import { Kbd } from "@nextui-org/react"

const CloseElementButton = (props: BButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="red"
				variant="bordered"
				{...props}
				startContent={<Cancel color="red" isHovering={isHovering} />}
				// endContent={<Kbd keys={["escape"]} />}
			>
				Fermer
			</BButton>
		</div>
	)
}

export default CloseElementButton
