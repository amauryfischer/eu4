import Minus from "@/ui/fondations/icons/Minus"
import BButton, { BButtonProps } from "../BButton/BButton"
import { useHover, useHoverDirty } from "react-use"
import { useRef } from "react"
import { Button } from "@nextui-org/react"
import Mine from "@/ui/fondations/icons/Mine"

const CollectButton = (props: BButtonProps & { title?: string }) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<div ref={ref}>
			<BButton
				color="caramel"
				variant="bordered"
				startContent={<Mine color="caramel" isHovering={isHovering} />}
				isIconOnly={props.title ? false : true}
				{...props}
			>
				{props.title}
			</BButton>
		</div>
	)
}

export default CollectButton
