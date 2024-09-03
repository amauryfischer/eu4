import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IPosition } from "./IPosition"
import { Planet } from "@prisma/client"

export enum TypePlanet {
	MARS = "mars"
}
export interface IPlanet extends Omit<Planet, "position"> {
	resources: Record<RESOURCE_TYPES, number>
	position: IPosition
	resourcesMultiplier: Record<RESOURCE_TYPES, number>
	mines: Record<RESOURCE_TYPES, number>
}
