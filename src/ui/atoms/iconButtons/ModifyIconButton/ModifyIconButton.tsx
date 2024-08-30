import { useHoverDirty } from "react-use";
import BButton from "../../buttons/Button/Button";
import { useRef } from "react";
import Edit from "@/ui/fondations/icons/Edit";

const ModifyIconButton = ({
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
				color="grey200"
				startContent={
					<Edit
						color="primary500"
						isHovering={isHovering}
						strokeWidth="0.6rem"
					/>
				}
				variant="light"
				isIconOnly
			>
				{children}
			</BButton>
		</div>
	);
};

export default ModifyIconButton;
