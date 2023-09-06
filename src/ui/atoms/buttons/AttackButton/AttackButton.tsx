import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { useHoverDirty } from "react-use"
import Attack from "@/ui/fondations/icons/Attack"

const AttackButton = (props: BButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="red"
				variant="solid"
				{...props}
				startContent={<Attack color="white" isHovering={isHovering} />}
			>
				{props.title}
			</BButton>
		</div>
	)
}

export default AttackButton
