import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IModule } from "./IModule"
import { Task } from "@prisma/client"

export enum TaskType {
  COLLECT_ASTEROIDS = "COLLECT_ASTEROIDS",
  RESEARCH = "RESEARCH",
  CONSTRUCT_SHIP = "CONSTRUCT_SHIP",
  CONSTRUCT_BUILDING = "CONSTRUCT_BUILDING",
  COLLECT_RESOURCES = "COLLECT_RESOURCES",
  CONSTRUCT_MODULE = "CONSTRUCT_MODULE",
}



export interface ITaskAsteroid extends Omit<Task,"details"> {
  type: TaskType.COLLECT_ASTEROIDS
  endTime: string
  details: {
    asteroidId: string
    fleetId: string
    resources: {
      [key in RESOURCE_TYPES]: number
    }
  }
}

export interface ITaskConstructModule extends Omit<Task,"details"> {
    type: TaskType.CONSTRUCT_MODULE
    endTime: string
    details: {
      resources: {
        [key in RESOURCE_TYPES]: number
      }
      planetId: string
      module: IModule
    }
}
