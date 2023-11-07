import Build from "@/ui/fondations/icons/Build"
import { useRef } from "react"
import { useHoverDirty } from "react-use"
import BButton, { BButtonProps } from "../BButton/BButton"
import { BButtonContainer } from "../BButton/BButton.styled"

const BuildButton = (props: BButtonProps & { title?: string }) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	return (
		<BButtonContainer ref={ref}>
			<BButton
				color="caramel"
				variant="bordered"
				startContent={
					<Build color="caramel" isHovering={isHovering} width="26px" />
				}
				isIconOnly={props.title ? false : true}
				{...props}
			>
				{props.title}
			</BButton>
		</BButtonContainer>
	)
}

export default BuildButton
