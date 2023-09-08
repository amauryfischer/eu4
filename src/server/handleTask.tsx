"use server"
import schedule from "node-schedule"
import moment from "moment"
import db from "@/app/db"
import {
	ITaskAsteroid,
	ITaskConstructModule,
	ITaskFlyingFleet,
} from "@/type/data/ITask"
import { fetchRandomResources } from "./utils/fetchRandomResources"
import { RESOURCE_TYPES } from "../services/ResourcesService"
import { addResources } from "./utils/addResources"
import _ from "lodash"

export const handleTask = (
	task: ITaskAsteroid | ITaskConstructModule | ITaskFlyingFleet,
) => {
	if (task.type == "COLLECT_ASTEROIDS") {
		handleCollectAsteroid(task)
	} else if (task.type == "FLYING_FLEET") {
		handleFlyingFleet(task)
	}
}

const handleCollectAsteroid = (task: ITaskAsteroid) => {
	const endDate = moment(task.endDate)
	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("handling collect asteroid")
		const fleet = await db.fleet.findUnique({
			where: { id: task.details.fleetId },
		})
		const asteroid = await db.asteroid.findUnique({
			where: { id: task.details.asteroidId },
		})
		const amount_fetch = 500 * endDate.diff(task.createdAt, "minutes")
		const { randomResources, remainingResources } = fetchRandomResources({
			resources: asteroid?.resources as Record<RESOURCE_TYPES, number>,
			amount: 90000,
		})
		// update
		await db.fleet.update({
			where: {
				id: fleet?.id,
			},
			data: {
				cargo: addResources({
					resourcesToAdd: randomResources,
					initialResources: fleet?.cargo as Record<RESOURCE_TYPES, number>,
				}),
			},
		})
		if (_.isEmpty(remainingResources)) {
			await db.asteroid.delete({
				where: {
					id: asteroid?.id,
				},
			})
		} else {
			await db.asteroid.update({
				where: {
					id: asteroid?.id,
				},
				data: {
					resources: remainingResources,
				},
			})
			console.table(remainingResources)
		}
		await db.task.delete({
			where: {
				id: task.id,
			},
		})
	})
}

const handleFlyingFleet = (task: ITaskFlyingFleet) => {
	const endDate = moment(task.endDate)
	schedule.scheduleJob(endDate.toDate(), async () => {
		console.log("handling flying fleet")
		const fleet = await db.fleet.findUnique({
			where: { id: task.details.fleetId },
		})
		await db.fleet.update({
			where: {
				id: fleet?.id,
			},
			data: {
				position: task.details.position as any,
			},
		})
	})
}
