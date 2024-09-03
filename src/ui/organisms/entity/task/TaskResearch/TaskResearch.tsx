import ResearchService from "@/services/ResearchService"
import ShipService from "@/services/ShipService"
import { ITaskResearch } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Mine from "@/ui/fondations/icons/Mine"
import { CardBody, Image } from "@nextui-org/react"
import { Task } from "@prisma/client"
import Moment from "moment"
import { RemainingTime } from "../TaskCard/TaskFlyingFleet/TaskFlyingFleet.styled"

const TaskResearch = ({ task }: { task: ITaskResearch }) => {
	const remainingTime = Moment(task.endDate).diff(Moment())
	const readableRemainingTime = Moment.duration(remainingTime).humanize()
	return (
		<>
			<Image
				src={ResearchService.researchTypeToImage(
					ResearchService.allResearch[task.details.research].type
				)}
				width="100%"
				height={200}
			/>
			<CardBody>
				<Flex alignItems="center" gap="0.5rem" className="text-white">
					<Mine width="36px" />
					Recherche en cours
				</Flex>
				<RemainingTime>{readableRemainingTime}</RemainingTime>
			</CardBody>
		</>
	)
}

export default TaskResearch
