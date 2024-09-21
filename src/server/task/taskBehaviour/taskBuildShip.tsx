import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import { ITaskBuildShip } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import TimeService from "@/services/TimeService"

const taskBuildShip = {
	onCreate: async (task: ITaskBuildShip) => {
		const planet = await db.planet.findUnique({
			where: {
				id: task.details.planetId
			}
		})
		const newResources = planet?.resources as Record<RESOURCE_TYPES, number>
		ResourcesService.allResources.forEach((r) => {
			newResources[r.name] = newResources[r.name] - task.details.cost[r.name]
		})
		await db.planet.update({
			where: {
				id: task.details.planetId
			},
			data: {
				resources: newResources
			}
		})

		return moment()
			.add(
				TimeService.calculateTimeFromResourceCost(task.details.cost),
				"minutes"
			)
			.toDate()
	},
	onDestroy: async (task: ITaskBuildShip) => {
		console.log("🚀 Space ship created")
		await db.ship.create({
			data: {
				class: task.details.class,
				modules: task.details.modules as any,
				name: task.details.name,
				planetId: task.details.planetId
			}
		})
	}
}

export default taskBuildShip
