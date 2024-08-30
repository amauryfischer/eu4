import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";

const SaveButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button color="primary" variant="shadow" {...props}>
				Sauvegarder
			</Button>
		</div>
	);
};

export default SaveButton;
