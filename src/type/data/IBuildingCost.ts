import { RESOURCE_TYPES } from "@/services/ResourcesService"

interface IBuildingCost {
	time: number
	cost: Record<RESOURCE_TYPES, number>
}

export default IBuildingCost