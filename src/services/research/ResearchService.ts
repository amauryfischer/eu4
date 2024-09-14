import { IResearch, IResearchType } from "@/type/data/IResearch"
import { chassisSearch, ResearchChassis } from "./chassis/chassisSearch"
import {
	propulsionSearch,
	ResearchPropulsion
} from "./propulsion/propulsionSearch"
import { defenseSearch, ResearchDefense } from "./defense/defenseSearch"
import { ResearchWeapon, weaponSearch } from "./weapon/weaponSearch"
import { cargoSearch, ResearchCargo } from "./cargo/cargoSearch"

const researchTypeToImage = (type: IResearchType) => {
	switch (type) {
		case IResearchType.CARGO:
			return "/images/modules/cargo/cargo_s.webp"
		case IResearchType.WEAPON:
			return "/images/modules/weapons/laser1.png"
		case IResearchType.DEFENSE:
			return "/images/modules/defense/shield1.png"
		case IResearchType.ENGINE:
			return "/images/modules/engines/propuls1.webp"
		default:
			return "/images/modules/other/material.png"
	}
}

export const Research = {
	...ResearchCargo,
	...ResearchChassis,
	...ResearchPropulsion,
	...ResearchDefense,
	...ResearchWeapon
}

const allResearch: Record<string, IResearch> = {
	...cargoSearch,
	...propulsionSearch,
	...defenseSearch,
	...weaponSearch,
	...chassisSearch
}

const getAllResearch = () => {
	return Object.values(allResearch)
}

export default {
	allResearch,
	getAllResearch,
	researchTypeToImage
}
