import { useHoverDirty } from "react-use";
import BButton from "../../buttons/Button/Button";
import { useRef } from "react";
import Save from "@/ui/fondations/icons/Save";

const SaveIconButton = ({
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
				color="emerald"
				startContent={
					<Save color="white" isHovering={isHovering} strokeWidth="1.2rem" />
				}
				variant="shadow"
				isIconOnly
			>
				{children}
			</BButton>
		</div>
	);
};

export default SaveIconButton;
