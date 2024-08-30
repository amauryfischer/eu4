import { useHoverDirty } from "react-use";
import BButton, { BButtonProps } from "../../buttons/Button/Button";
import { useRef } from "react";
import Sell from "@/ui/fondations/icons/Sell";

const BuyIconButton = (props: BButtonProps) => {
	const ref = useRef(null);
	const isHovering = useHoverDirty(ref);
	return (
		<div ref={ref}>
			<BButton
				startContent={
					<Sell
						color={props.color}
						isHovering={isHovering}
						strokeWidth="1.2rem"
					/>
				}
				variant="bordered"
				isIconOnly
				{...props}
			></BButton>
		</div>
	);
};

export default BuyIconButton;
