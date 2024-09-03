export enum IResearchType {
	ENGINE = "engine",
	DEFENSE = "defense",
	WEAPON = "weapon",
	CARGO = "cargo",
	OTHER = "other"
}

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
	CARGOM: "cargom",
	CARGOL: "cargol",
	CARGOXL: "cargoxl",
	LASER2: "laser2",
	LASER3: "laser3",
	WARP2: "warp2",
	WARP3: "warp3",
	WARP4: "warp4",
	SHIELD2: "shield2",
	COQUE2: "coque2"
}
export interface IResearch {
	name: string
	description: string
	type: IResearchType
	time: number
	required: string[]
	id: string
}
const allResearch: Record<string, IResearch> = {
	[Research.CARGOM]: {
		name: "Répartition de la charge",
		description:
			"Nos scientifiques ont découvert que la répartition de la charge dans les cargos pouvait être optimisée pour augmenter la capacité de charge des cargos tout en améliorant leur résistance aux radiations cosmiques.",
		type: IResearchType.CARGO,
		time: 100,
		required: [],
		id: Research.CARGOM
	},
	[Research.CARGOL]: {
		name: "Structure de stockage en alliage de titane renforcé",
		description:
			"Nos scientifiques pensent qu'en altérant la structure interne atomique du titane, ils peuvent augmenter significativement la capacité de charge des cargos de classe L tout en améliorant leur résistance aux radiations cosmiques.",
		type: IResearchType.CARGO,
		time: 200,
		required: [Research.CARGOM],
		id: Research.CARGOL
	},
	[Research.CARGOXL]: {
		name: "Système de stockage par confinement magnétique avancé",
		description:
			"Nos chercheurs ont imaginé les plans d'un système de confinement magnétique avancé pour les cargos de classe XL, permettant de stabiliser des charges massives et de réduire les risques de défaillance structurelle lors des voyages interstellaires prolongés.",
		type: IResearchType.CARGO,
		time: 300,
		required: [Research.CARGOL],
		id: Research.CARGOXL
	},
	[Research.LASER2]: {
		name: "Amélioration de la focalisation laser",
		description:
			"Les avancées dans la technologie de focalisation des lasers permettent d'augmenter la puissance de destruction tout en maintenant une consommation d'énergie optimale.",
		type: IResearchType.WEAPON,
		time: 150,
		required: [],
		id: Research.LASER2
	},
	[Research.LASER3]: {
		name: "Amplificateur de rayon laser",
		description:
			"Des recherches sur les amplificateurs de rayon laser ont permis de développer des lasers avec une cadence de tir plus élevée et une précision améliorée.",
		type: IResearchType.WEAPON,
		time: 250,
		required: [Research.LASER2],
		id: Research.LASER3
	},
	[Research.WARP2]: {
		name: "Refroidissement warp avancé",
		description:
			"Les scientifiques ont conçu un nouveau système de refroidissement pour les moteurs warp, augmentant leur efficacité et permettant des voyages plus longs sans surchauffe.",
		type: IResearchType.ENGINE,
		time: 200,
		required: [],
		id: Research.WARP2
	},
	[Research.WARP3]: {
		name: "Optimisation de la distorsion spatiale",
		description:
			"En optimisant la distorsion spatiale générée par les moteurs warp, les ingénieurs ont réussi à réduire la consommation d'énergie et augmenter la vitesse maximale.",
		type: IResearchType.ENGINE,
		time: 300,
		required: [Research.WARP2],
		id: Research.WARP3
	},
	[Research.WARP4]: {
		name: "Système de stabilisation multidimensionnelle",
		description:
			"Ce système de stabilisation avancé permet aux moteurs warp de naviguer dans des conditions spatiales difficiles, augmentant la sécurité et la fiabilité.",
		type: IResearchType.ENGINE,
		time: 400,
		required: [Research.WARP3],
		id: Research.WARP4
	},
	[Research.SHIELD2]: {
		name: "Renforcement des boucliers énergétiques",
		description:
			"Des recherches avancées sur le renforcement des champs énergétiques ont permis de créer des boucliers avec une capacité d'absorption d'énergie accrue.",
		type: IResearchType.DEFENSE,
		time: 180,
		required: [],
		id: Research.SHIELD2
	},
	[Research.COQUE2]: {
		name: "Matériaux de coque améliorés",
		description:
			"En utilisant de nouveaux composites et alliages, les ingénieurs ont créé des coques plus résistantes et durables pour les vaisseaux.",
		type: IResearchType.DEFENSE,
		time: 220,
		required: [],
		id: Research.COQUE2
	}
}

const getAllResearch = () => {
	return Object.values(allResearch)
}

export default {
	allResearch,
	getAllResearch,
	researchTypeToImage
}
