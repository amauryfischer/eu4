



import { IResearchType } from "@/type/data/IResearch"

export const ResearchWeapon = {
	LASER2: "LASER2",
	LASER3: "LASER3"
}

export const weaponSearch = {
	[ResearchWeapon.LASER2]: {
		name: "Amélioration de la focalisation laser",
		description:
			"Les avancées dans la technologie de focalisation des lasers permettent d'augmenter la puissance de destruction tout en maintenant une consommation d'énergie optimale.",
		type: IResearchType.WEAPON,
		time: 150,
		required: [],
		id: ResearchWeapon.LASER2
	},
	[ResearchWeapon.LASER3]: {
		name: "Amplificateur de rayon laser",
		description:
			"Des recherches sur les amplificateurs de rayon laser ont permis de développer des lasers avec une cadence de tir plus élevée et une précision améliorée.",
		type: IResearchType.WEAPON,
		time: 250,
		required: [ResearchWeapon.LASER2],
		id: ResearchWeapon.LASER3
	}
}
