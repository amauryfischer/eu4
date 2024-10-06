import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import { ITaskBuildShip } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import TimeService from "@/services/TimeService"
import ShipService from "@/services/ShipService"

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
		const fast = process.env.NEXT_PUBLIC_FAST === "true"
		return moment()
			.add(
				fast ? 1 : TimeService.calculateTimeFromResourceCost(task.details.cost),
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
				planetId: task.details.planetId,
				coque: ShipService.getShipFullCoque({
					class: task.details.class,
					modules: task.details.modules
				}),
				shield: ShipService.getShipFullShield({
					class: task.details.class,
					modules: task.details.modules
				}),
				userId: task.userId
			}
		})
	}
}

export default taskBuildShip
