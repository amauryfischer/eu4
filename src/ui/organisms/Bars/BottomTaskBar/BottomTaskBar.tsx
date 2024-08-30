"use client";
import ListTask from "../../entity/task/ListTask";
import { BottomTaskBarContainer } from "./BottomTaskBar.styled";

const BottomTaskBar = () => {
	return (
		<BottomTaskBarContainer>
			<ListTask />
		</BottomTaskBarContainer>
	);
};

export default BottomTaskBar;
