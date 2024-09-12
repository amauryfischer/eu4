import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import moment from "moment"
import db from "@/app/db"
import { fetchRandomResources } from "@/server/utils/fetchRandomResources"
import { addResources } from "@/server/utils/addResources"
import _ from "lodash"
import { ITaskAsteroid } from "@/type/data/ITask"
import { Ship } from "@prisma/client"
import { IModifier, IModule } from "@/type/data/IModule"

const taskCollectAsteroid = {
	onCreate: async (task: ITaskAsteroid) => {
		return moment(task.endDate).toDate()
	},
	onDestroy: async (task: ITaskAsteroid) => {
		const fleet = await db.fleet.findUnique({
			where: { id: task.details.fleetId }
		})
		const ships = await db.ship.findMany({
			where: {
				id: {
					in: fleet?.shipIds as string[]
				}
			}
		})
		const miningPower = _.sumBy(ships, (s: Ship) =>
			_.sumBy(
				s.modules as any as IModule[],
				(m: IModule) => m?.modifier?.[IModifier.EXTRACTION_ASTEROID] ?? 0
			)
		)
		const asteroid = await db.asteroid.findUnique({
			where: { id: task.details.asteroidId }
		})
		// const amount_fetch = 500 * endDate.diff(task.createdAt, "minutes")
		const { randomResources, remainingResources } = fetchRandomResources({
			resources: asteroid?.resources as Record<RESOURCE_TYPES, number>,
			amount: 50000 * miningPower
		})
		// update
		await db.fleet.update({
			where: {
				id: fleet?.id
			},
			data: {
				cargo: addResources({
					resourcesToAdd: randomResources,
					initialResources: fleet?.cargo as Record<RESOURCE_TYPES, number>
				})
			}
		})
		if (_.isEmpty(remainingResources)) {
			await db.asteroid.delete({
				where: {
					id: asteroid?.id
				}
			})
		} else {
			await db.asteroid.update({
				where: {
					id: asteroid?.id
				},
				data: {
					resources: remainingResources
				}
			})
		}
	}
}

export default taskCollectAsteroid
