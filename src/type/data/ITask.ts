import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IModule } from "./IModule"
import { Task } from "@prisma/client"
import { IPosition } from "./IPosition"

export enum TaskType {
  COLLECT_ASTEROIDS = "COLLECT_ASTEROIDS",
  RESEARCH = "RESEARCH",
  CONSTRUCT_SHIP = "CONSTRUCT_SHIP",
  CONSTRUCT_BUILDING = "CONSTRUCT_BUILDING",
  COLLECT_RESOURCES = "COLLECT_RESOURCES",
  CONSTRUCT_MODULE = "CONSTRUCT_MODULE",
  FLYING_FLEET = "FLYING_FLEET",
}


export interface ITaskAsteroid extends Omit<Task, "details"> {
  type: TaskType.COLLECT_ASTEROIDS
  endDate: string
  details: {
    asteroidId: string
    fleetId: string
  }
}

export interface ITaskConstructModule extends Omit<Task, "details"> {
  type: TaskType.CONSTRUCT_MODULE
  endDate: string
  details: {
    resources: {
      [key in RESOURCE_TYPES]: number
    }
    planetId: string
    module: IModule
  }
}

export interface ITaskFlyingFleet extends Omit<Task, "details"> {
  type: TaskType.FLYING_FLEET
  endDate: string
  details: {
    fleetId: string
    position: IPosition
  }
}

export type ITask = ITaskAsteroid | ITaskConstructModule | ITaskFlyingFleet