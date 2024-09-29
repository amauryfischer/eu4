import { IFleet } from "@/type/data/IFleet"
import React from "react"
import { FleetGridContainer } from "./ListFleet.styled"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { setCurrentFleet } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"
import ManageButton from "@/ui/atoms/buttons/ManageButton"
import {
	Avatar,
	AvatarGroup,
	Image,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@nextui-org/react"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import { TaskType } from "@/type/data/ITask"
import moment from "moment"
import FuelBar from "../FuelBar"
import FleetService from "@/services/FleetService"
import Button from "@/ui/atoms/buttons/Button"
import BProgress from "@/ui/molecules/progress/BProgress"
import { ShieldProgress } from "@/ui/molecules/progress/BProgress/BProgress.styled"

const ListFleetCombat = ({
	fleets,
	additionalRows
}: {
	fleets: IFleet[]
	additionalRows?: Array<(fleet: IFleet) => JSX.Element>
}) => {
	const ships = useShips()
	const dispatch = useDispatch()
	const tasks = useTasks()
	return (
		<FleetGridContainer
			numberOfRows={
				additionalRows === undefined ? 3 : 3 + additionalRows.length
			}
		>
			{fleets.map((fleet) => {
				const shipList = fleet.shipIds.map((shipId) => ships[shipId])
				if (shipList.length === 0) {
					return null
				}
				const shipClasses = shipList.map(
					(ship) => ShipService.getAllShips()[ship?.class]
				)
				return shipList.map((ship, index) => (
					<React.Fragment key={`${fleet.id}-${ship.id}`}>
						<Image src={shipClasses[index]?.img} isBlurred width="400px" />
						<div className="text-lg font-bold text-white">{fleet.name}</div>
						<div className="text-white min-w-[200px] flex flex-col gap-2">
							<ShieldProgress
								value={
									(ship.shield * 100) / ShipService.getShipFullShield(ship)
								}
							/>
							<BProgress
								value={(ship.coque * 100) / ShipService.getShipFullCoque(ship)}
							/>
						</div>
					</React.Fragment>
				))
			})}
		</FleetGridContainer>
	)
}

export default ListFleetCombat
