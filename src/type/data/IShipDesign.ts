import { RESOURCE_TYPES } from "@/services/ResourcesService"

type IShipDesign = {
	class: string
	cost?: { [key in RESOURCE_TYPES]?: number }
	img: string
	name: string
	emplacement: number
	fuelSpace: number
	multiplier: {
		warp?: number
		impulse?: number
		conso?: number
		shield?: number
	}
	baseCoque: number
	classType: "A" | "B" | "C" | "D" | "station"
}

export default IShipDesign
