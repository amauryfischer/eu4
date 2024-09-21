import { IFleet } from "@/type/data/IFleet"
import React from "react"
import { FleetGridContainer } from "./ListFleet.styled"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import BButton from "@/ui/atoms/buttons/Button"
import { setCurrentFleet } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"
import ManageButton from "@/ui/atoms/buttons/ManageButton"
import { Avatar, AvatarGroup } from "@nextui-org/react"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import { TaskType } from "@/type/data/ITask"
import moment from "moment"
import FuelBar from "../FuelBar"
import FleetService from "@/services/FleetService"

const ListFleet = ({
	fleets,
	additionalRows
}: { fleets: IFleet[]; additionalRows?: (fleet: IFleet) => JSX.Element }) => {
	const ships = useShips()
	const dispatch = useDispatch()
	const tasks = useTasks()
	return (
		<FleetGridContainer numberOfRows={additionalRows === undefined ? 4 : 6}>
			{fleets.map((fleet) => {
				const shipList = fleet.shipIds.map((shipId) => ships[shipId])
				const shipClasses = shipList.map(
					(ship) => ShipService.getAllShips()[ship.class]
				)
				const assembleFleetTask = Object.values(tasks).find(
					(task) =>
						task.type === TaskType.ASSEMBLE_FLEET &&
						task.details.fleetId === fleet.id
				)
				return (
					<React.Fragment key={fleet.id}>
						<AvatarGroup>
							{shipClasses.map((shipClass) => (
								<Avatar
									src={shipClass.img}
									radius="lg"
									size="lg"
									isBordered
									key={shipClass.id}
								/>
							))}
						</AvatarGroup>
						<div className="text-lg font-bold text-white">{fleet.name}</div>
						<FuelBar
							progress={
								(fleet?.fuel * 100) /
								FleetService.getTotalFuel({
									ships: fleet.shipIds.map((shipId) => ships[shipId])
								})
							}
						/>
						{assembleFleetTask ? (
							<div className="text-white">
								Décollage... en orbite dans :{" "}
								{moment
									.duration(moment(assembleFleetTask.endDate).diff(moment()))
									.humanize()}
							</div>
						) : (
							<ManageButton
								onPress={() => {
									dispatch(setCurrentFleet(fleet.id))
								}}
								title="Gérer la flotte"
							/>
						)}
						{additionalRows?.(fleet)}
					</React.Fragment>
				)
			})}
		</FleetGridContainer>
	)
}

export default ListFleet
