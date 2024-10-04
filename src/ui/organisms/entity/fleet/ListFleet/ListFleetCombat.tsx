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
	PopoverTrigger,
	Skeleton
} from "@nextui-org/react"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import { TaskType } from "@/type/data/ITask"
import moment from "moment"
import FuelBar from "../FuelBar"
import FleetService from "@/services/FleetService"
import Button from "@/ui/atoms/buttons/Button"
import BProgress from "@/ui/molecules/progress/BProgress"
import { ShieldProgress } from "@/ui/molecules/progress/BProgress/BProgress.styled"
import Flex from "@/ui/atoms/Flex"
import _ from "lodash"
import IPirate from "@/type/data/IPirate"

const ListFleetCombat = ({
	fleet
}: {
	fleet: IFleet | IPirate
}) => {
	const ships = useShips()
	const dispatch = useDispatch()
	const tasks = useTasks()
	const shipList = fleet.shipIds.map((shipId) => ships[shipId])
	if (shipList.length === 0) {
		return null
	}
	const shipClasses = shipList.map(
		(ship) => ShipService.getAllShips()[ship?.class]
	)
	return (
		<div className="flex flex-col gap-2 w-full items-center justify-center">
			{shipList.map((ship, index) => {
				if (_.isEmpty(ship)) {
					return <Skeleton key={`${fleet.id}-${ship.id}`} className="w-full h-full" />
				}
				return (
					<Flex key={`${fleet.id}-${ship.id}`} gap="1rem" alignItems="center">
						<Image src={shipClasses[index]?.img} isBlurred width="150px" />
						<div className="text-white min-w-[200px] flex flex-col gap-2">
							<div className="text-lg font-bold text-white">{ship.name}</div>
							<ShieldProgress
								value={
									(ship.shield * 100) / ShipService.getShipFullShield(ship)
								}
							/>
							<BProgress
								value={(ship.coque * 100) / ShipService.getShipFullCoque(ship)}
							/>
						</div>
					</Flex>
				)
			})}
		</div>
	)
}

export default ListFleetCombat
