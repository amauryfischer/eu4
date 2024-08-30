import { useRef } from "react";
import Button from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { useHover } from "@uidotdev/usehooks";

const CancelButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button color="default" variant="light" {...props}>
				Annuler
			</Button>
		</div>
	);
};

export default CancelButton;
