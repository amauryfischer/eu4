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

const ListFleet = ({
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
				additionalRows === undefined ? 6 : 6 + additionalRows.length
			}
		>
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
						<div className="text-white min-w-[200px] flex flex-col gap-2">
							<div className="text-default-200 text-sm">Shield</div>
							<ShieldProgress
								value={
									(fleet.shipIds.reduce(
										(acc, shipId) => acc + ships[shipId].shield,
										0
									) *
										100) /
									fleet.shipIds.reduce(
										(acc, shipId) =>
											acc + ShipService.getShipFullShield(ships[shipId]),
										0
									)
								}
							/>
							<div className="text-default-200 text-sm">Coque</div>
							<BProgress
								value={
									(fleet.shipIds.reduce(
										(acc, shipId) => acc + ships[shipId].coque,
										0
									) *
										100) /
									fleet.shipIds.reduce(
										(acc, shipId) =>
											acc + ShipService.getShipFullCoque(ships[shipId]),
										0
									)
								}
							/>
						</div>
						<div className="text-white">
							{fleet.position?.system}:{fleet.position?.systemPosition.x}:
							{fleet.position?.systemPosition.y}:
							{fleet.position?.systemPosition.z}
						</div>
						<div className="text-white min-w-[200px] flex flex-col gap-2">
							<div className="text-default-200 text-sm">Fuel</div>
							<FuelBar
								progress={
									(fleet?.fuel * 100) /
									FleetService.getTotalFuel({
										ships: fleet.shipIds.map((shipId) => ships[shipId])
									})
								}
							/>
						</div>
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
						{additionalRows?.map((row) => row(fleet))}
					</React.Fragment>
				)
			})}
		</FleetGridContainer>
	)
}

export default ListFleet
