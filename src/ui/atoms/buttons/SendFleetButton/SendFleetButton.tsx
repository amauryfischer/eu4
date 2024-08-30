import Spaceship from "@/ui/fondations/icons/Spaceship";
import { useHover } from "@uidotdev/usehooks";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

const SendFleetButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				color="cyan600"
				variant="solid"
				{...props}
				startContent={<Spaceship color="white" isHovering={isHovering} />}
			>
				{props.title}
			</Button>
		</div>
	);
};

export default SendFleetButton;
