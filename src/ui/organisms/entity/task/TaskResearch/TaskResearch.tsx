import ResearchService from "@/services/ResearchService"
import ShipService from "@/services/ShipService"
import { ITaskResearch } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Mine from "@/ui/fondations/icons/Mine"
import { CardBody, Image } from "@nextui-org/react"
import { Task } from "@prisma/client"
import Moment from "moment"
import {
	RemainingTime,
	SImage,
	SpaceShipContainer,
	StyledProgress,
	TaskContainer
} from "../TaskCard/TaskFlyingFleet/TaskFlyingFleet.styled"

const TaskResearch = ({
	task,
	progress
}: { task: ITaskResearch; progress: number }) => {
	const remainingTime = Moment(task.endDate).diff(Moment())
	const readableRemainingTime = Moment.duration(remainingTime).humanize()
	return (
		<TaskContainer $color="blue">
			<SImage
				src={ResearchService.researchTypeToImage(
					ResearchService.allResearch[task.details.research].type
				)}
				width={300}
				classNames={{
					wrapper: "max-w-full",
					img: "max-w-full"
				}}
			/>
			<SpaceShipContainer>
				<Mine />
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

export default TaskResearch
