import { IFleet } from "@/type/data/IFleet"
import React from "react"
import { FleetGridContainer } from "./ListFleet.styled"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import BButton from "@/ui/atoms/buttons/BButton"
import { setCurrentFleet } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"

const ListFleet = ({ fleets }: { fleets: IFleet[] }) => {
	const ships = useShips()
	const dispatch = useDispatch()
	return (
		<FleetGridContainer>
			{fleets.map((fleet) => {
				const firstShipId = fleet.shipIds[0]
				const ship = ships[firstShipId]
				const shipClass = ShipService.getAllShips()[ship.class]
				return (
					<>
						<img
							src={shipClass.img}
							alt={fleet.name}
							width="100"
							height="100"
						/>
						<div>{fleet.name}</div>
						<BButton
							color="purple"
							variant="bordered"
							onPress={() => {
								dispatch(setCurrentFleet(fleet.id))
							}}
						>
							Gérer la flotte
						</BButton>
						<div></div>
					</>
				)
			})}
		</FleetGridContainer>
	)
}

export default ListFleet
