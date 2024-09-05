import { ITaskUpgradeResource } from "@/type/data/ITask"
import Moment from "moment"

import ResearchService from "@/services/ResearchService"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
import ResourcesService from "@/services/ResourcesService"

const TaskUpgradeResource = ({
	task,
	progress
}: {
	task: ITaskUpgradeResource
	progress: number
}) => {
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Mine />}
			color="purple"
			imgSrc={ResourcesService.getAllResources()[task.details.resource].img}
		/>
	)
}

export default TaskUpgradeResource
