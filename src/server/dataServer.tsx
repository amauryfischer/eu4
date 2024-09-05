"use server"

import db from "@/app/db"
import { generateInitialValues } from "./initialData"
import moment from "moment"
import schedule from "node-schedule"
import { handleTask } from "./handleTask"
import ResourcesService from "@/services/ResourcesService"

const RESOURCES_MINING_MULTIPLIER = 50

const deleteEveryThing = async () => {
	await db.task.deleteMany()
	await db.fleet.deleteMany()
	await db.planet.deleteMany()
	await db.pirate.deleteMany()
	await db.asteroid.deleteMany()
	await db.user.deleteMany()
	await db.ship.deleteMany()
}

export const fetchServerData = async (type: any) => {
	// delete all data
	// await deleteEveryThing()

	// ? delete finished task if finished
	const tasks = await db.task.findMany()
	tasks.forEach(async (task) => {
		const endDate = moment(task.endDate).add("5", "minute")
		if (endDate.isBefore(moment())) {
			console.log("deleting task : ", task.id)
			await db.task.delete({
				where: {
					id: task.id
				}
			})
		}
	})

	const prismaType = type.toLowerCase() as any

	const syncDataPlanet = async () => {
		const planets = await db.planet.findMany()
		planets.forEach(async (planet) => {
			const lastPlanetSync = planet.lastSync
			const parsedLastPlanetSync = Date.parse(lastPlanetSync || "0")
			// if last sync is more than 1 minute ago
			if (Date.now() - parsedLastPlanetSync > 60000) {
				// update syncDate
				await db.planet.update({
					where: {
						id: planet.id
					},
					data: {
						lastSync: new Date().toISOString(),
						resources: {
							// add 50k for each minute
							Titane:
								planet.resources.Titane +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Titane * 100,
									level: planet?.mines?.Titane || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Cuivre:
								planet.resources.Cuivre +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Cuivre * 100,
									level: planet?.mines?.Cuivre || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Fer:
								planet.resources.Fer +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Fer * 100,
									level: planet?.mines?.Fer || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Aluminium:
								planet.resources.Aluminium +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Aluminium * 100,
									level: planet?.mines?.Aluminium || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Silicium:
								planet.resources.Silicium +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Silicium * 100,
									level: planet?.mines?.Silicium || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Uranium:
								planet.resources.Uranium +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Uranium * 100,
									level: planet?.mines?.Uranium || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Azote:
								planet.resources.Azote +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Azote * 100,
									level: planet?.mines?.Azote || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000,
							Hydrogène:
								planet.resources.Hydrogène +
								(ResourcesService.calculateResourceSpeed({
									percentage: planet?.resourcesMultiplier?.Hydrogène * 100,
									level: planet?.mines?.Hydrogène || 1
								}) *
									(Date.now() - parsedLastPlanetSync)) /
									60_000
						}
					}
				})
			}
		})
	}

	if (type === "Planet") {
		await syncDataPlanet()
	}

	if (type === "User") {
		// find user with email : admin@eu4.com
		const user = await db.user.findUnique({
			where: {
				email: "admin@eu4.com"
			}
		})
		return [user]
	}

	// @ts-ignore
	const data = await db[prismaType].findMany()
	if (type === "Planet" && data.length === 0) {
		generateInitialValues()
	}
	return data
}

export const updateServerData = async (type: any, id: any, data: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	const newData = await db[prismaType].update({
		where: {
			id
		},
		data
	})
	return newData
}

export const deleteServerData = async (type: any, id: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	await db[prismaType].delete({
		where: {
			id
		}
	})
}

export const createServerData = async (type: any, data: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore

	const serverCreatedData = await db[prismaType].create({
		data
	})
	if (type == "Task") {
		await handleTask(serverCreatedData)
	}

	return serverCreatedData
}

const createRandomAsteroids = async () => {
	const asteroidResources = {}
	const available_resources = [
		"Titane",
		"Cuivre",
		"Fer",
		"Azote",
		"Uranium",
		"Silicium",
		"Hydrogène",
		"Aluminium"
	]
	available_resources.forEach((el) => {
		asteroidResources[el] = Math.floor(Math.random() * 100000)
	})
	await db.asteroid.create({
		data: {
			position: {
				system: 1237,
				systemPosition: {
					x: Math.floor(Math.random() * 100) - 50,
					y: Math.floor(Math.random() * 100) - 50,
					z: Math.floor(Math.random() * 100) - 50
				}
			},
			resources: asteroidResources
		}
	})
}

export const fetchParcelsData = async (system: string) => {
	const allPlanets = await db.planet.findMany()
	const allFleets = await db.fleet.findMany()
	const allAsteroids = await db.asteroid.findMany()
	const allPirates = await db.pirate.findMany()

	// if 0 asteroids, use 6 times createRandomAsteroids
	if (allAsteroids.length === 0) {
		for (let i = 0; i < 6; i++) {
			await createRandomAsteroids()
		}
	}

	const planetsToReturn = allPlanets.filter((planet) => {
		return (planet.position as any)?.["system"] == system
	})
	const fleetsToReturn = allFleets.filter(
		(fleet) => (fleet.position as any)?.["system"] == system
	)
	const asteroidsToReturn = allAsteroids.filter(
		(asteroid) => (asteroid.position as any)?.["system"] == system
	)
	const piratesToReturn = allPirates.filter(
		(pirate) => (pirate.position as any)?.["system"] == system
	)
	return {
		planets: planetsToReturn,
		fleets: fleetsToReturn,
		asteroids: asteroidsToReturn,
		pirates: piratesToReturn
	}
}
