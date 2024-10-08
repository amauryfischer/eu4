import taskBuildShip from "./taskBehaviour/taskBuildShip"
import { ITask, TaskType } from "@/type/data/ITask"
import taskCollectAsteroid from "./taskBehaviour/taskCollectAsteroid"
import taskFlyingFleet from "./taskBehaviour/taskFlyingFleet"
import taskResearch from "./taskBehaviour/taskResearch"
import taskAssembleFleet from "./taskBehaviour/taskAssembleFleet"
import taskUpgradeResource from "./taskBehaviour/taskUpgradeResource"
import taskFight from "./taskBehaviour/taskFight"
import taskUpgradeBuilding from "./taskBehaviour/taskUpgradeBuilding"

const allTasks: {
	[K in TaskType]: {
		onCreate: (task: Extract<ITask, { type: K }>) => Promise<Date>
		onDestroy: (task: Extract<ITask, { type: K }>) => Promise<void>
	}
} = {
	[TaskType.BUILD_SHIP]: taskBuildShip,
	[TaskType.COLLECT_ASTEROIDS]: taskCollectAsteroid,
	[TaskType.FLYING_FLEET]: taskFlyingFleet,
	[TaskType.RESEARCH]: taskResearch,
	[TaskType.ASSEMBLE_FLEET]: taskAssembleFleet,
	[TaskType.UPGRADE_RESOURCE]: taskUpgradeResource,
	[TaskType.UPGRADE_BUILDING]: taskUpgradeBuilding,
	[TaskType.FIGHT]: taskFight
}

export default allTasks
