import Build from "@/ui/fondations/icons/Build";
import { useRef } from "react";
import { BButtonContainer } from "../Button/Button.styled";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";

const BuildButton = (props: ButtonProps & { title?: string }) => {
	const [ref, isHovering] = useHover();
	return (
		<BButtonContainer ref={ref}>
			<Button
				color="caramel"
				variant="bordered"
				startContent={
					<Build color="caramel" isHovering={isHovering} width="26px" />
				}
				isIconOnly={!props.title}
				{...props}
			>
				{props.title}
			</Button>
		</BButtonContainer>
	);
};

export default BuildButton;
