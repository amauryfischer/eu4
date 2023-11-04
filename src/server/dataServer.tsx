"use server"

import db from "@/app/db"
import { generateInitialValues } from "./initialData"
import moment from "moment"
import schedule from "node-schedule"
import { handleTask } from "./handleTask"

export const fetchServerData = async (type: any) => {
	// delete all data
	// await db.planet.deleteMany()

	// ? delete finished task if finished
	const tasks = await db.task.findMany()
	tasks.forEach(async (task) => {
		const endDate = moment(task.endDate).add("5", "minute")
		if (endDate.isBefore(moment())) {
			console.log("deleting task : ", task.id)
			await db.task.delete({
				where: {
					id: task.id,
				},
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
						id: planet.id,
					},
					data: {
						lastSync: new Date().toISOString(),
						resources: {
							// add 50k for each minute
							Titane:
								planet?.resources?.Titane !== undefined
									? planet.resources.Titane +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Cuivre:
								planet?.resources?.Cuivre !== undefined
									? planet.resources.Cuivre +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Fer:
								planet?.resources?.Fer !== undefined
									? planet.resources.Fer +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Azote:
								planet?.resources?.Azote !== undefined
									? planet.resources.Azote +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Uranium:
								planet?.resources?.Uranium !== undefined
									? planet.resources.Uranium +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Silicium:
								planet?.resources?.Silicium !== undefined
									? planet.resources.Silicium +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Hydrogène:
								planet?.resources?.Hydrogène !== undefined
									? planet.resources.Hydrogène +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
							Aluminium:
								planet?.resources?.Aluminium !== undefined
									? planet.resources.Aluminium +
									  (500 * (Date.now() - parsedLastPlanetSync)) / 60000
									: 0,
						},
					},
				})
			}
		})
	}

	if (type === "Planet") {
		await syncDataPlanet()
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
			id,
		},
		data,
	})
	return newData
}

export const deleteServerData = async (type: any, id: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	await db[prismaType].delete({
		where: {
			id,
		},
	})
}

export const createServerData = async (type: any, data: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore

	const serverCreatedData = await db[prismaType].create({
		data,
	})
	if (type == "Task") {
		handleTask(serverCreatedData)
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
		"Aluminium",
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
					z: Math.floor(Math.random() * 100) - 50,
				},
			},
			resources: asteroidResources,
		},
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
		(fleet) => (fleet.position as any)?.["system"] == system,
	)
	const asteroidsToReturn = allAsteroids.filter(
		(asteroid) => (asteroid.position as any)?.["system"] == system,
	)
	const piratesToReturn = allPirates.filter(
		(pirate) => (pirate.position as any)?.["system"] == system,
	)
	return {
		planets: planetsToReturn,
		fleets: fleetsToReturn,
		asteroids: asteroidsToReturn,
		pirates: piratesToReturn,
	}
}
