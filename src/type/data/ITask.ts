import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IModule } from "./IModule"
import { Task } from "@prisma/client"
import { IPosition } from "./IPosition"
import { BUILDING_TYPE } from "./IPlanet"

export enum TaskType {
		BUILD_SHIP = "BUILD_SHIP",
		ASSEMBLE_FLEET = "ASSEMBLE_FLEET",
		COLLECT_ASTEROIDS = "COLLECT_ASTEROIDS",
		RESEARCH = "RESEARCH",
		FLYING_FLEET = "FLYING_FLEET",
		UPGRADE_RESOURCE = "UPGRADE_RESOURCE",
		UPGRADE_BUILDING = "UPGRADE_BUILDING",
		FIGHT = "FIGHT"
	}
export interface ITaskUpgradeResource extends Omit<Task, "details"> {
	type: TaskType.UPGRADE_RESOURCE
	endDate: string
	details: {
		resource: RESOURCE_TYPES
		level: number
		planetId: string
	}
}
export interface ITaskUpgradeBuilding extends Omit<Task, "details"> {
	type: TaskType.UPGRADE_BUILDING
	endDate: string
	details: {
		buildingType: BUILDING_TYPE
		planetId: string
	}
}
export interface ITaskAsteroid extends Omit<Task, "details"> {
	type: TaskType.COLLECT_ASTEROIDS
	endDate: string
	details: {
		asteroidId: string
		fleetId: string
	}
}



// export interface ITaskConstructModule extends Omit<Task, "details"> {
// 	type: TaskType.CONSTRUCT_MODULE
// 	endDate: string
// 	details: {
// 		resources: {
// 			[key in RESOURCE_TYPES]: number
// 		}
// 		planetId: string
// 		module: IModule
// 	}
// }

export interface ITaskFlyingFleet extends Omit<Task, "details"> {
	type: TaskType.FLYING_FLEET
	endDate: string
	details: {
		fleetId: string
		position: IPosition
	}
}

export interface ITaskBuildShip extends Omit<Task, "details"> {
	type: TaskType.BUILD_SHIP
	endDate: string
	details: {
		name: string
		modules: IModule[]
		class: string
		planetId: string
		cost: {
			[key in RESOURCE_TYPES]: number
		}
	}
}

export interface ITaskFight extends Omit<Task, "details"> {
	type: TaskType.FIGHT
	endDate: string
	details: {
		fleetIds: string[]
		pirateIds: string[]
		position: IPosition
		log: string[]
	}
}
export interface ITaskAssembleFleet extends Omit<Task, "details"> {
	type: TaskType.ASSEMBLE_FLEET
	endDate: string
	details: {
		id: string
		shipIds: string[]
		planetId: string
		name: string
		fleetId: string
	}
}
export interface ITaskResearch extends Omit<Task, "details"> {
	type: TaskType.RESEARCH
	endDate: string
	details: {
		research: string
	}
}
export type ITask =
		| ITaskAsteroid
		| ITaskFlyingFleet
		| ITaskAssembleFleet
		| ITaskBuildShip
		| ITaskResearch
		| ITaskUpgradeResource
		| ITaskUpgradeBuilding
		| ITaskFight
