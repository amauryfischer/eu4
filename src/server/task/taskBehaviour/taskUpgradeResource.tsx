import { ITaskUpgradeResource } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"

const taskUpgradeResource = {
	onCreate: async (task: ITaskUpgradeResource) => {
		const endDate = moment().add(task.details.level * 30, "seconds")
		const currentPlanet = await db.planet.findUnique({
			where: {
				id: task.details.planetId
			}
		})
		const newResources = currentPlanet?.resources as Record<
			RESOURCE_TYPES,
			number
		>
		ResourcesService.allResources.forEach((r) => {
			newResources[r.name] =
				newResources[r.name] -
				Math.floor(ResourcesService.costToUpgrade(task.details.level, r.name))
		})
		await db.planet.update({
			where: {
				id: task.details.planetId
			},
			data: {
				resources: newResources
			}
		})
		return endDate.toDate()
	},
	onDestroy: async (task: ITaskUpgradeResource) => {
		const currentPlanet = await db.planet.findUnique({
			where: {
				id: task.details.planetId
			}
		})
		await db.planet.update({
			where: {
				id: task.details.planetId
			},
			data: {
				mines: {
					...(currentPlanet?.mines as Record<RESOURCE_TYPES, number>),
					[task.details.resource]: task.details.level + 1
				}
			}
		})
	}
}

export default taskUpgradeResource
