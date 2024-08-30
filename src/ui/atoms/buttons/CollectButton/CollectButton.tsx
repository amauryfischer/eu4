import Minus from "@/ui/fondations/icons/Minus";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";
import Mine from "@/ui/fondations/icons/Mine";

const CollectButton = (props: ButtonProps & { title?: string }) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				color="caramel"
				variant="bordered"
				startContent={<Mine color="caramel" isHovering={isHovering} />}
				isIconOnly={!props.title}
				{...props}
			>
				{props.title}
			</Button>
		</div>
	);
};

export default CollectButton;
