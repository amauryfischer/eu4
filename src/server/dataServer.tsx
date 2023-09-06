"use server"

import db from "@/app/db"
import { generateInitialValues } from "./initialData"

export const fetchServerData = async (type: any) => {
	console.log("fetchServerData")
	console.log("Fetching : " + type)

	// delete all data
	// await db.planet.deleteMany()

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
	console.log("data", data)
	console.log("Type", type)
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

	return serverCreatedData
}

export const fetchParcelsData = async (system: string) => {
	const allPlanets = await db.planet.findMany()
	const allFleets = await db.fleet.findMany()
	const allAsteroids = await db.asteroid.findMany()
	const allPirates = await db.pirate.findMany()

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
