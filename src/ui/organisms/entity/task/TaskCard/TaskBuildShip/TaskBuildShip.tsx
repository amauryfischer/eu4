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
import Moment from "moment"
const TaskBuildShip = ({
	task,
	progress
}: { task: ITaskBuildShip; progress: number }) => {
	const remainingTime = Moment(task.endDate).diff(Moment())
	const readableRemainingTime = Moment.duration(remainingTime).humanize()
	return (
		<TaskContainer $color="blue">
			<Image
				src={ShipService.getAllShips()[task.details.class]?.img}
				width="100%"
				height={200}
			/>
			<SpaceShipContainer>
				<Mine width="36px" />
			</SpaceShipContainer>
			<RemainingTime>{readableRemainingTime}</RemainingTime>
			<StyledProgress
				aria-label="Loading..."
				value={progress}
				className="max-w-md"
			/>
		</TaskContainer>
	)
}

export default TaskBuildShip
