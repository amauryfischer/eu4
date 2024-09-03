"use server"
import schedule from "node-schedule"
import moment from "moment"
import db from "@/app/db"
import {
	ITaskAssembleFleet,
	ITaskAsteroid,
	ITaskBuildShip,
	ITaskConstructModule,
	ITaskFlyingFleet,
	ITaskResearch,
	ITaskUpgradeResource
} from "@/type/data/ITask"
import { fetchRandomResources } from "./utils/fetchRandomResources"
import ResourcesService, { RESOURCE_TYPES } from "../services/ResourcesService"
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
		| ITaskResearch
		| ITaskBuildShip
		| ITaskUpgradeResource
) => {
	if (task.type === TaskType.COLLECT_ASTEROIDS) {
		await handleCollectAsteroid(task)
	} else if (task.type === TaskType.FLYING_FLEET) {
		await handleFlyingFleet(task)
	} else if (task.type === TaskType.ASSEMBLE_FLEET) {
		await handleAssembleFleet(task)
	} else if (task.type === TaskType.BUILD_SHIP) {
		await handleBuildShip(task)
	} else if (task.type === TaskType.RESEARCH) {
		await handleResearch(task)
	} else if (task.type === TaskType.UPGRADE_RESOURCE) {
		await handleUpgradeResource(task)
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
const handleBuildShip = async (task: ITaskBuildShip) => {
	const endDate = moment().add(15, "seconds")
	const planet = await db.planet.findUnique({
		where: {
			id: task.details.planetId
		}
	})
	schedule.scheduleJob(endDate.toDate(), async () => {
		// todo add a planetId for ships not in a fleet and filter them on planet creation
		await db.ship.create({
			data: {
				class: task.details.class,
				modules: task.details.modules,
				name: task.details.name
			}
		})
		await db.task.delete({
			where: {
				id: task.id
			}
		})
	})
}
const handleResearch = async (task: ITaskResearch) => {
	const endDate = moment().add(task.details.time, "minutes")
	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("[Task] : handling research")
		await db.task.delete({
			where: {
				id: task.id
			}
		})
		await db.user.update({
			where: {
				id: task.userId
			},
			data: {
				research: {
					push: task.details.research
				}
			}
		})
	})
}

const handleUpgradeResource = async (task: ITaskUpgradeResource) => {
	console.log("[creating task] upgrade resource")
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
	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("[Task] : handling upgrade resource")
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
					...currentPlanet?.mines,
					[task.details.resource]: task.details.level + 1
				}
			}
		})
		await db.task.delete({
			where: {
				id: task.id
			}
		})
	})
}
