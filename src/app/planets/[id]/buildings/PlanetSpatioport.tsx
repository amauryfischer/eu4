import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Moment from "moment";
import _ from "lodash";
import ShipService from "@/services/ShipService";
import { Checkbox } from "@mui/material";
import Flex from "@/ui/atoms/Flex";
import useShips from "@/hooks/data/entity/use-ships.hook";
import usePlanets from "@/hooks/data/entity/use-planets.hook";
import useFleets from "@/hooks/data/entity/use-fleets.hook";
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook";
import { Input } from "@nextui-org/react";
import IShip from "@/type/data/IShip";
import { IFleet } from "@/type/data/IFleet";
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet";
import { useParams } from "next/navigation";
import Button from "@/ui/atoms/buttons/Button";

const StyledCheckbox = styled(Checkbox)`
  color: var(--primary) !important;
`;
const ClickableShipContainer = styled.div`
  cursor: pointer;
`;

const YellowText = styled.span`
  color: var(--primary) !important;
`;

const PlanetSpatioport = ({}) => {
	// * state
	const [selectedShips, setSelectedShips] = useState<string[]>([]);
	const [fleetName, setFleetName] = useState("");

	// * selector
	const ships = useShips();
	const { id } = useParams();
	const { createFleet } = useFleetsActions();
	const planet = useCurrentPlayerActivePlanet();

	const fleets = useFleets();

	// * dispatch
	const dispatch = useDispatch();

	// * history
	// const history = useHistory()

	const onToggleShip = (shipId: string) => {
		if (selectedShips.includes(shipId)) {
			setSelectedShips(
				selectedShips.filter((shipIdToFilter) => shipIdToFilter !== shipId),
			);
			return;
		}
		setSelectedShips([...selectedShips, shipId]);
	};

	const onCreateFleet = () => {
		createFleet({
			name: fleetName,
			shipIds: selectedShips,
			position: planet.position,
			cargo: {},
		});
		setFleetName("");
		setSelectedShips([]);
	};

	const shipClasses = ShipService.getAllShips();

	return (
		<Flex direction="column" gap="2rem">
			<Flex fullWidth>
				<Flex gap="0.5rem" alignItems="center">
					<Input
						label="nom de la flotte"
						placeholder="nom de la flotte"
						value={fleetName}
						onChange={(e) => setFleetName(e.target.value)}
						variant="bordered"
					/>
					<Button variant="bordered" color="primary" onPress={onCreateFleet}>
						Créer une flotte
					</Button>
				</Flex>
			</Flex>
			{Object.values(ships).map((ship: IShip) => {
				if (
					Object.values(fleets).some((fleet: IFleet) =>
						fleet?.shipIds?.includes(ship.id),
					)
				) {
					return null;
				}
				const chassis = shipClasses[ship.class];
				return (
					<ClickableShipContainer
						key={ship.id}
						onClick={() => {
							onToggleShip(ship.id);
						}}
					>
						<Flex gap="0.5rem">
							<StyledCheckbox checked={selectedShips.includes(ship.id)} />
							<img src={chassis.img} width={80} />
							<YellowText>
								{ship.name} ({chassis.name})
							</YellowText>
						</Flex>
					</ClickableShipContainer>
				);
			})}
		</Flex>
	);
};

export default PlanetSpatioport;
