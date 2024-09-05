import ResearchService from "@/services/ResearchService"
import { ITaskResearch } from "@/type/data/ITask"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCard/TaskCardBasic/TaskCardBasic"

const TaskResearch = ({
	task,
	progress
}: { task: ITaskResearch; progress: number }) => {
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Mine />}
			color="blue"
			imgSrc={ResearchService.researchTypeToImage(
				ResearchService.allResearch[task.details.research].type
			)}
		/>
	)
}

export default TaskResearch
