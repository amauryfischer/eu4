import { useHoverDirty } from "react-use";
import BButton from "../../buttons/Button/Button";
import { useRef } from "react";
import Cancel from "@/ui/fondations/icons/Cancel";

const CancelIconButton = ({
	handleClick,
	children,
}: {
	handleClick: () => void;
	children?: React.ReactNode;
}) => {
	const ref = useRef(null);
	const isHovering = useHoverDirty(ref);
	return (
		<div ref={ref}>
			<BButton
				onClick={handleClick}
				color="red"
				startContent={
					<Cancel color="red" isHovering={isHovering} strokeWidth="1.2rem" />
				}
				variant="bordered"
				isIconOnly
			>
				{children}
			</BButton>
		</div>
	);
};

export default CancelIconButton;
