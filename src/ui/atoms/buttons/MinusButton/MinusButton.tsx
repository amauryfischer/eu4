import Minus from "@/ui/fondations/icons/Minus";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";

const MinusButton = (props: ButtonProps & { label?: string }) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				variant="bordered"
				startContent={<Minus color={props.color} isHovering={isHovering} />}
				isIconOnly={!props.label}
				{...props}
			>
				{props.label}
			</Button>
		</div>
	);
};

export default MinusButton;
