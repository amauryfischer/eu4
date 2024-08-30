import { useRef } from "react";
import Button from "../Button/Button";
import Cancel from "@/ui/fondations/icons/Cancel";
import { useHover } from "@uidotdev/usehooks";
import { Kbd } from "@nextui-org/react";
import type { ButtonProps } from "../Button/Button";

const CloseElementButton = (props: ButtonProps) => {
	const [ref, isHovering] = useHover();
	return (
		<div ref={ref}>
			<Button
				color="red"
				variant="bordered"
				{...props}
				startContent={<Cancel color="red" isHovering={isHovering} />}
				// endContent={<Kbd keys={["escape"]} />}
			>
				Fermer
			</Button>
		</div>
	);
};

export default CloseElementButton;
