import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { useHoverDirty } from "react-use"

const SendFleetButton = (props: BButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="cyan600"
				variant="solid"
				{...props}
				startContent={<Spaceship color="white" isHovering={isHovering} />}
			>
				{props.title}
			</BButton>
		</div>
	)
}

export default SendFleetButton
