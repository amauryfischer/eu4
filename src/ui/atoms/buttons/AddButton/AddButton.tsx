import Add from "@/ui/fondations/icons/Add"
import BButton, { BButtonProps } from "../BButton/BButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
import { Button } from "@nextui-org/react"

const AddButton = (props: BButtonProps & { label: string }) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="primary"
				startContent={<Add color="grey100" isHovering={isHovering} />}
				{...props}
			>
				{props.label}
			</BButton>
		</div>
	)
}

export default AddButton
