export enum IResearchType {
	ENGINE = "engine",
	DEFENSE = "defense",
	WEAPON = "weapon",
	CARGO = "cargo",
	OTHER = "other",
	CHASSIS = "chassis",
	RESOURCES = "resources"
}

export interface IResearch {
		name: string
		description: string
		type: IResearchType
		time: number
		required: string[]
		id: string
		researchBuildingLevel: number
	}
