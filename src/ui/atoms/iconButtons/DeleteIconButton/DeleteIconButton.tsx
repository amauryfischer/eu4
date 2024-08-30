import { useHoverDirty } from "react-use";
import BButton from "../../buttons/Button/Button";
import { useRef } from "react";
import Edit from "@/ui/fondations/icons/Edit";
import Delete from "@/ui/fondations/icons/Delete";

const DeleteIconButton = ({
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
				onPress={handleClick}
				color="red"
				variant="shadow"
				startContent={<Delete color="white" isHovering={isHovering} />}
				isIconOnly
			>
				{children}
			</BButton>
		</div>
	);
};

export default DeleteIconButton;
