import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import { ITaskBuildShip, ITaskUpgradeBuilding } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import TimeService from "@/services/TimeService"
import BuildingService from "@/services/building/BuildingService"

const taskUpgradeBuilding = {
	onCreate: async (task: ITaskUpgradeBuilding) => {
		const planet = await db.planet.findUnique({
			where: {
				id: task.details.planetId
			}
		})
		const allBuildings = BuildingService.getAllBuildings()
		const cost = allBuildings[task.details.buildingType]?.[
			planet?.buildingLevel[task.details.buildingType] + 1
		]?.cost as Record<RESOURCE_TYPES, number>

		if (!cost) {
			throw new Error(
				`Invalid building type or level: ${task.details.buildingType}`
			)
		}

		const newResources = planet?.resources as Record<RESOURCE_TYPES, number>
		ResourcesService.allResources.forEach((r) => {
			newResources[r.name] = newResources[r.name] - cost[r.name]
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
				allBuildings[task.details.buildingType]?.[
					planet?.buildingLevel[task.details.buildingType] + 1
				]?.time,
				"milliseconds"
			)
			.toDate()
	},
	onDestroy: async (task: ITaskUpgradeBuilding) => {
		console.log("🌍 Building upgraded")
        const planet = await db.planet.findUnique({
			where: {
				id: task.details.planetId
			}
		})
		await db.planet.update({
			where: {
				id: task.details.planetId
			},
			data: {
				buildingLevel: {
                    ...planet?.buildingLevel,
					[task.details.buildingType]: (planet?.buildingLevel[task.details.buildingType] as number) + 1
				}
			}
		}
	}
}

export default taskUpgradeBuilding
    