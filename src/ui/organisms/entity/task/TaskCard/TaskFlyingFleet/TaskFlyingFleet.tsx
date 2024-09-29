import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAsteroid, ITaskFlyingFleet } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { CardBody, Image, ModalBody } from "@nextui-org/react"
import styled from "styled-components"
import Moment from "moment"
import {
	RemainingTime,
	SImage,
	SpaceShipContainer,
	StyledProgress,
	TaskContainer
} from "./TaskFlyingFleet.styled"
import BProgress from "@/ui/molecules/progress/BProgress"
import { cloneElement } from "react"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"

const TaskFlyingFleet = ({
	task,
	progress
}: {
	task: ITaskFlyingFleet
	progress: number
}) => {
	const fleets = useFleets()
	const ships = useShips()
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Spaceship />}
			color="blue"
			imgSrc={
				ShipService.getAllShips()[
					ships[fleets[task.details.fleetId].shipIds[0]].class
				]?.img
			}
		/>
	)
}

export default TaskFlyingFleet
