"use server"
import schedule from "node-schedule"
import moment from "moment"
import db from "@/app/db"
import {
	ITaskAssembleFleet,
	ITaskAsteroid,
	ITaskConstructModule,
	ITaskFlyingFleet
} from "@/type/data/ITask"
import { fetchRandomResources } from "./utils/fetchRandomResources"
import { RESOURCE_TYPES } from "../services/ResourcesService"
import { addResources } from "./utils/addResources"
import _ from "lodash"
import { TaskType } from "@prisma/client"
import { IModifier } from "@/type/data/IModule"
import { IFleet } from "@/type/data/IFleet"
import UniverseService from "@/services/UniverseService"
import IShip from "@/type/data/IShip"

export const handleTask = async (
	task:
		| ITaskAsteroid
		| ITaskConstructModule
		| ITaskFlyingFleet
		| ITaskAssembleFleet
) => {
	if (task.type === TaskType.COLLECT_ASTEROIDS) {
		await handleCollectAsteroid(task)
	} else if (task.type === TaskType.FLYING_FLEET) {
		await handleFlyingFleet(task)
	} else if (task.type === TaskType.ASSEMBLE_FLEET) {
		await handleAssembleFleet(task)
	}
}

const handleCollectAsteroid = async (task: ITaskAsteroid) => {
	const endDate = moment(task.endDate)
	console.log("creating task")
	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("[Task] handling collect asteroid")
		const fleet = await db.fleet.findUnique({
			where: { id: task.details.fleetId }
		})
		fleet?.shipIds
		const ships = await db.ship.findMany({
			where: {
				id: {
					in: fleet?.shipIds as string[]
				}
			}
		})
		const miningPower = _.sumBy(ships, (s) =>
			_.sumBy(
				s.modules,
				(m) => m?.modifier?.[IModifier.EXTRACTION_ASTEROID] ?? 0
			)
		)
		console.log("mining power", miningPower)
		const asteroid = await db.asteroid.findUnique({
			where: { id: task.details.asteroidId }
		})
		// const amount_fetch = 500 * endDate.diff(task.createdAt, "minutes")
		const { randomResources, remainingResources } = fetchRandomResources({
			resources: asteroid?.resources as Record<RESOURCE_TYPES, number>,
			amount: 50000 * miningPower
		})
		console.log("extracting :")
		console.table(randomResources)
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
			console.log("asteroid empty, deleting")
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
			console.log("remaining")
			console.table(remainingResources)
		}
		await db.task.delete({
			where: {
				id: task.id
			}
		})
	})
}

const handleFlyingFleet = async (task: ITaskFlyingFleet) => {
	console.log("[creating task] flying fleet")
	const fleet = (await db.fleet.findUnique({
		where: { id: task.details.fleetId }
	})) as unknown as IFleet

	const ships = (await db.ship.findMany({
		where: {
			id: {
				in: fleet?.shipIds as string[]
			}
		}
	})) as unknown as Array<IShip>
	const { timeToAdd } = UniverseService.getDistance({
		positionFinal: task.details.position,
		positionInitial: fleet.position,
		ships
	})

	await db.task.update({
		where: {
			id: task.id
		},
		data: {
			endDate: moment().add(timeToAdd, "seconds").format()
		}
	})

	const endDate = moment().add(timeToAdd, "seconds")

	console.log("finishing to", task.details.position)
	console.log("in", timeToAdd, "seconds")

	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("[Task] : handling flying fleet")
		console.log("fleet", fleet)
		console.log("task", task)
		await db.fleet.update({
			where: {
				id: fleet?.id
			},
			data: {
				position: task.details.position as any
			}
		})
		await db.task.delete({
			where: {
				id: task.id
			}
		})
	})
}

const handleAssembleFleet = async (task: ITaskAssembleFleet) => {
	console.log("[creating task] assemble fleet")
	const endDate = moment().add(3, "minutes")
	const planet = await db.planet.findUnique({
		where: {
			id: task.details.planetId
		}
	})
	const fleet = await db.fleet.create({
		data: {
			shipIds: task.details.shipIds,
			position: planet?.position,
			name: task.details.name,
			cargo: {}
		}
	})
	await db.task.update({
		where: {
			id: task.id
		},
		data: {
			endDate: endDate.format(),
			details: {
				...task.details,
				fleetId: fleet.id
			}
		}
	})
	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("[Task] : handling assemble fleet")
		await db.task.delete({
			where: {
				id: task.id
			}
		})
	})
}
