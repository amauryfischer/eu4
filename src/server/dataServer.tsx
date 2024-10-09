"use server"

import db from "@/app/db"
import { Prisma } from "@prisma/client"
import moment from "moment"
import { Session } from "next-auth"
import { generateInitialValues } from "./initialData"
import scheduleTask from "./task/scheduleTask"
import syncDataPlanet from "./utils/syncDataPlanet"
import { TaskType } from "@/type/data/ITask"

const deleteEveryThing = async () => {
	console.log("🚮 Droping the base")
	await db.task.deleteMany()
	await db.fleet.deleteMany()
	await db.planet.deleteMany()
	await db.pirate.deleteMany()
	await db.asteroid.deleteMany()
	await db.user.deleteMany()
	await db.ship.deleteMany()
}

export const fetchServerData = async (
	type: Prisma.ModelName,
	session: Session
) => {
	// delete all data
		//await deleteEveryThing()

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
		if (!session?.user) {
			return []
		}

		if (type === "Planet") {
			await syncDataPlanet()
		}

		if (type === "User") {
			if (session) {
				const user = await db.user.findUnique({
					where: {
						email: session.user.email
					}
				})
				return [user]
			}
		}

		if (type === "Task") {
			const userTasks = await db.task.findMany({
				where: {
					userId: session.user.id
				}
			})
			const fightTasks = await db.task.findMany({
				where: {
					type: TaskType.FIGHT
				}
			})
			return [...userTasks, ...fightTasks]
		}

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
	if (type === "Task") {
		// @ts-ignore
		return await scheduleTask(data)
	}
	const serverCreatedData = await db[prismaType].create({
		data
	})
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
	const allShips = await db.ship.findMany()

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
	const shipsToReturn = allShips.filter((ship) =>
		fleetsToReturn.some((fleet) => fleet.shipIds.some((s) => s.id === ship.id))
	)
	return {
		planets: planetsToReturn,
		fleets: fleetsToReturn,
		asteroids: asteroidsToReturn,
		pirates: piratesToReturn,
		ships: shipsToReturn
	}
}
