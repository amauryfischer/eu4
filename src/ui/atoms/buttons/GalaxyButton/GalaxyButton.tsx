import { useRef } from "react";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import Spaceship from "@/ui/fondations/icons/Spaceship";
import { useHover } from "@uidotdev/usehooks";
import Galaxy from "@/ui/fondations/icons/Galaxy";

const GalaxyButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				color="cyan600"
				variant="bordered"
				{...props}
				startContent={<Galaxy color="cyan600" isHovering={isHovering} />}
			>
				{props.title}
			</Button>
		</div>
	);
};

export default GalaxyButton;
