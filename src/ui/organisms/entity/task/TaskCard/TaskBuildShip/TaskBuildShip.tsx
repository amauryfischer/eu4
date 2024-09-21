import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAssembleFleet, ITaskBuildShip } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Mine from "@/ui/fondations/icons/Mine"
import { CardBody, Image } from "@nextui-org/react"
import { Task } from "@prisma/client"
import {
	RemainingTime,
	SpaceShipContainer,
	StyledProgress,
	TaskContainer
} from "../TaskFlyingFleet/TaskFlyingFleet.styled"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
const TaskBuildShip = ({
	task,
	progress
}: { task: ITaskBuildShip; progress: number }) => {
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Mine />}
			color="blue"
			imgSrc={ShipService.getAllShips()[task.details.class]?.img}
		/>
	)
}

export default TaskBuildShip
