import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";
import Manage from "@/ui/fondations/icons/Manage";

const ManageButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				color="purple400"
				variant="bordered"
				{...props}
				startContent={<Manage color="purple400" isHovering={isHovering} />}
			>
				{props.title}
			</Button>
		</div>
	);
};

export default ManageButton;
