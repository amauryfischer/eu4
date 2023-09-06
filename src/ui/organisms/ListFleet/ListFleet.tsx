import { IFleet } from "@/type/data/IFleet"
import React from "react"
import { FleetGridContainer } from "./ListFleet.styled"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import BButton from "@/ui/atoms/buttons/BButton"
import { setCurrentFleet } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"
import ManageButton from "@/ui/atoms/buttons/ManageButton"

const ListFleet = ({
	fleets,
	additionalRows,
}: { fleets: IFleet[]; additionalRows?: (fleet: IFleet) => JSX.Element }) => {
	const ships = useShips()
	const dispatch = useDispatch()
	return (
		<FleetGridContainer numberOfRows={additionalRows === undefined ? 4 : 5}>
			{fleets.map((fleet) => {
				const firstShipId = fleet.shipIds[0]
				const ship = ships[firstShipId]
				const shipClass = ShipService.getAllShips()[ship.class]
				return (
					<>
						<img
							src={shipClass.img}
							alt={fleet.name}
							width="300"
							height="auto"
						/>
						<div>{fleet.name}</div>
						<ManageButton
							onPress={() => {
								dispatch(setCurrentFleet(fleet.id))
							}}
							title="Gérer la flotte"
						/>
						<div></div>
						{additionalRows?.(fleet)}
					</>
				)
			})}
		</FleetGridContainer>
	)
}

export default ListFleet
