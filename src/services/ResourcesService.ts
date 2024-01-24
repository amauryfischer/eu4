export enum RESOURCE_TYPES {
	TITANE = "Titane",
	CUIVRE = "Cuivre",
	FER = "Fer",
	ALUMINUM = "Aluminium",
	SILICIUM = "Silicium",
	URANIUM = "Uranium",
	AZOTE = "Azote",
	HYDROGENE = "Hydrogène",
}
export type IResource = {
	name: RESOURCE_TYPES
	img: string
}
// type any of resource type
export const TITANE = {
	name: RESOURCE_TYPES.TITANE,
	img: "/images/resources/ti.png",
}
export const AZOTE = {
	name: RESOURCE_TYPES.AZOTE,
	img: "/images/resources/azote.png",
}
export const ALUMINUM = {
	name: RESOURCE_TYPES.ALUMINUM,
	img: "/images/resources/alu.png",
}
export const CUIVRE = {
	name: RESOURCE_TYPES.CUIVRE,
	img: "/images/resources/cuivre.png",
}
export const FER = {
	name: RESOURCE_TYPES.FER,
	img: "/images/resources/fer.png",
}
export const URANIUM = {
	name: RESOURCE_TYPES.URANIUM,
	img: "/images/resources/ura.png",
}
export const HYDROGENE = {
	name: RESOURCE_TYPES.HYDROGENE,
	img: "/images/resources/hydro.png",
}
export const SILICIUM = {
	name: RESOURCE_TYPES.SILICIUM,
	img: "/images/resources/sili.png",
}
const getAllResources: () => Record<RESOURCE_TYPES, IResource> = () => {
	return {
		[RESOURCE_TYPES.TITANE]: TITANE,
		[RESOURCE_TYPES.CUIVRE]: CUIVRE,
		[RESOURCE_TYPES.ALUMINUM]: ALUMINUM,
		[RESOURCE_TYPES.FER]: FER,
		[RESOURCE_TYPES.SILICIUM]: SILICIUM,
		[RESOURCE_TYPES.URANIUM]: URANIUM,
		[RESOURCE_TYPES.AZOTE]: AZOTE,
		[RESOURCE_TYPES.HYDROGENE]: HYDROGENE,
	}
}

const renderResources = (value: number) => {
	if (value < 1_000) {
		return Math.floor(value).toString()
	}
	if (value < 1_000_000) {
		return `${(value / 1_000).toFixed(2)}k`
	}
	if (value < 1_000_000_000) {
		return `${(value / 1_000_000).toFixed(2)}M`
	}
	return `${(value / 1_000_000_000).toFixed(2)}B`
}
const allResources = [
	TITANE,
	CUIVRE,
	FER,
	ALUMINUM,
	SILICIUM,
	URANIUM,
	AZOTE,
	HYDROGENE,
]
export default {
	getAllResources,
	renderResources,
	allResources,
}
