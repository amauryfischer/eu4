import { ITaskUpgradeResource } from "@/type/data/ITask"
import Attack from "@/ui/fondations/icons/Attack"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
import BuildingService from "@/services/building/BuildingService"
import getAllBuildings from "@/utils/allBuildings"

const TaskUpgradeBuilding = ({
	task,
	progress
}: {
	task: ITaskUpgradeResource
	progress: number
}) => {
	const buildingType = task.details.buildingType
	const level = task.details.level
	const planetId = task.details.planetId
	const buildings = getAllBuildings(planetId)
	const buildingSrc = buildings.find((b) => b.type === buildingType)?.src
	return (
		<>
			<TaskCardBasic
				task={task}
				progress={progress}
				icon={<Attack />}
				onClick={() => {}}
				color="purple"
				imgSrc={buildingSrc}
			/>
		</>
	)
}

export default TaskUpgradeBuilding
