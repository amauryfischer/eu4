import ResearchService from "@/services/research/ResearchService"
import { ITaskResearch } from "@/type/data/ITask"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCard/TaskCardBasic/TaskCardBasic"
import ModulesService from "@/services/ModulesService"
import ShipService from "@/services/ShipService"

const TaskResearch = ({
	task,
	progress
}: { task: ITaskResearch; progress: number }) => {
	const imageFromResearch = (researchId: string) => {
		if (
			Object.values(ModulesService.getAllModules()).some(
				(module) =>
					module.requiredResearch?.includes(researchId) &&
					module.requiredResearch?.length === 1
			)
		) {
			return Object.values(ModulesService.getAllModules()).find(
				(module) =>
					module.requiredResearch?.includes(researchId) &&
					module.requiredResearch?.length === 1
			)?.img
		}
		if (
			Object.values(ShipService.getAllShips()).some(
				(ship) =>
					ship.requiredResearch?.includes(researchId) &&
					ship.requiredResearch?.length === 1
			)
		) {
			return Object.values(ShipService.getAllShips()).find(
				(ship) =>
					ship.requiredResearch?.includes(researchId) &&
					ship.requiredResearch?.length === 1
			)?.img
		}
		return ResearchService.researchTypeToImage(
			ResearchService.allResearch[researchId].type
		)
	}
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Mine />}
			color="blue"
			imgSrc={imageFromResearch(task.details.research)}
		/>
	)
}

export default TaskResearch
