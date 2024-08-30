import { IFleet } from "@/type/data/IFleet";
import React from "react";
import { FleetGridContainer } from "./ListFleet.styled";
import useShips from "@/hooks/data/entity/use-ships.hook";
import ShipService from "@/services/ShipService";
import BButton from "@/ui/atoms/buttons/Button";
import { setCurrentFleet } from "@/redux/slice/current.slice";
import { useDispatch } from "react-redux";
import ManageButton from "@/ui/atoms/buttons/ManageButton";
import { Avatar, AvatarGroup } from "@nextui-org/react";

const ListFleet = ({
	fleets,
	additionalRows,
}: { fleets: IFleet[]; additionalRows?: (fleet: IFleet) => JSX.Element }) => {
	const ships = useShips();
	const dispatch = useDispatch();
	return (
		<FleetGridContainer numberOfRows={additionalRows === undefined ? 4 : 5}>
			{fleets.map((fleet) => {
				const shipList = fleet.shipIds.map((shipId) => ships[shipId]);
				const shipClasses = shipList.map(
					(ship) => ShipService.getAllShips()[ship.class],
				);
				return (
					<>
						<AvatarGroup>
							{shipClasses.map((shipClass) => (
								<Avatar src={shipClass.img} radius="lg" size="lg" isBordered />
							))}
						</AvatarGroup>
						<div>{fleet.name}</div>
						<ManageButton
							onPress={() => {
								dispatch(setCurrentFleet(fleet.id));
							}}
							title="Gérer la flotte"
						/>
						<div></div>
						{additionalRows?.(fleet)}
					</>
				);
			})}
		</FleetGridContainer>
	);
};

export default ListFleet;
