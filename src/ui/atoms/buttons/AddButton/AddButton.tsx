import Add from "@/ui/fondations/icons/Add";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";

const AddButton = (props: ButtonProps & { label?: string }) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				variant="bordered"
				startContent={<Add color={props.color} isHovering={isHovering} />}
				isIconOnly={!props.label}
				{...props}
			>
				{props.label}
			</Button>
		</div>
	);
};

export default AddButton;
