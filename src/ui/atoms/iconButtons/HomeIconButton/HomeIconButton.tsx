import { useHoverDirty } from "react-use";
import BButton from "../../buttons/Button/Button";
import { useRef } from "react";
import Edit from "@/ui/fondations/icons/Edit";
import Home from "@/ui/fondations/icons/Home";

const HomeIconButton = ({
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
				variant="bordered"
				color="primary"
				startContent={
					<Home color="primary" isHovering={isHovering} strokeWidth="0.3rem" />
				}
				isIconOnly
			>
				{children}
			</BButton>
		</div>
	);
};

export default HomeIconButton;
