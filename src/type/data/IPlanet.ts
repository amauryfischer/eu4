import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IPosition } from "./IPosition"
import { Planet, User } from "@prisma/client"

export enum TypePlanet {
	MARS = "mars"
}
export enum BUILDING_TYPE {
	RESEARCH = "RESEARCH",
	MINES = "MINES",
	COMMUNICATION = "COMMUNICATION",
	SHIP_FACTORY = "SHIP_FACTORY",
	SPATIOPORT = "SPATIOPORT",
	FACTORY = "FACTORY",
	HANGAR = "HANGAR",
	UNIVERSITY = "UNIVERSITY"

	// centre commercial
	// casernes
	// gouvernement
}
export interface IPlanet extends Omit<Planet, "position"> {
	resources: Record<RESOURCE_TYPES, number>
	position: IPosition
	resourcesMultiplier: Record<RESOURCE_TYPES, number>
	mines: Record<RESOURCE_TYPES, number>
	user?: User
	buildingsLevel: Record<BUILDING_TYPE, number>
}
