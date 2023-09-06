import { useRef } from "react"
import BButton, { BButtonProps } from "../BButton/BButton"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { useHoverDirty } from "react-use"
import Galaxy from "@/ui/fondations/icons/Galaxy"

const GalaxyButton = (props: BButtonProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="cyan600"
				variant="bordered"
				{...props}
				startContent={<Galaxy color="cyan600" isHovering={isHovering} />}
			>
				{props.title}
			</BButton>
		</div>
	)
}

export default GalaxyButton
