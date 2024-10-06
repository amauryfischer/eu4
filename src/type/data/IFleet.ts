import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IPosition } from "./IPosition"

export interface IFleet {
		id: string
		name: string
		shipIds: string[]
		position: IPosition
		cargo?: Record<RESOURCE_TYPES, number>
		fuel: number
		userId: string
	}
