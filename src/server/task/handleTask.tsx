"use server"
import schedule from "node-schedule"
import moment from "moment"
import db from "@/app/db"
import {
	ITaskAssembleFleet,
	ITaskAsteroid,
	ITaskBuildShip,
	ITaskFlyingFleet,
	ITaskResearch,
	ITaskUpgradeResource
} from "@/type/data/ITask"
import { fetchRandomResources } from "../utils/fetchRandomResources"
import ResourcesService, {
	RESOURCE_TYPES
} from "../../services/ResourcesService"
import { addResources } from "../utils/addResources"
import _ from "lodash"
import { TaskType } from "@prisma/client"
import { IModifier } from "@/type/data/IModule"
import { IFleet } from "@/type/data/IFleet"
import UniverseService from "@/services/UniverseService"
import IShip from "@/type/data/IShip"

export const handleTask = async (
	task:
		| ITaskAsteroid
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
