import Attack from "@/ui/fondations/icons/Attack";
import { useHover } from "@uidotdev/usehooks";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

const AttackButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				color="red"
				variant="solid"
				{...props}
				startContent={<Attack color="white" isHovering={isHovering} />}
			>
				{props.title}
			</Button>
		</div>
	);
};

export default AttackButton;
