import { ITaskUpgradeResource } from "@/type/data/ITask"
import Moment from "moment"

import ResearchService from "@/services/research/ResearchService"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
import Attack from "@/ui/fondations/icons/Attack"

const TaskFight = ({
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
			icon={<Attack />}
			color="purple"
			imgSrc={"/images/other/fight.webp"}
		/>
	)
}

export default TaskFight
