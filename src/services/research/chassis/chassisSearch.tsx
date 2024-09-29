import { IResearch, IResearchType } from "@/type/data/IResearch"
import { DAYS, HOURS, MINUTES } from "@/utils/time"
import { ResearchPropulsion } from "../propulsion/propulsionSearch"
import { ResearchDefense } from "../defense/defenseSearch"
import { ResearchCargo } from "../cargo/cargoSearch"
export const ResearchChassis = {
	Navette: "Navette",
	Chasseur: "Chasseur",
	Corvette: "Corvette",
	Fregate: "Fregate",
	Destroyer: "Destroyer",
	Croiseur: "Croiseur",
	Intercepteur: "Intercepteur",
	Croiseur_intergalactique: "Croiseur_intergalactique",
	Croiseur_combat: "Croiseur_combat",
	Warrior: "Warrior",
	Centaure: "Centaure",
	Minotaure: "Minotaure",
	Titan: "Titan",
	Behemot: "Behemot",
	Hades: "Hades",
	Leviathan: "Leviathan"
}



export const chassisSearch = {
	[ResearchChassis.Navette]: {
		name: "Programme de découverte spatiale",
		description:
			"Notre programme de recherche étant focalisé sur l'exploration spatiale depuis la récente découverte d'alien, nous avons orienté la totalité de nos scientifiques sur un programme commun, la céation d'une navette spatiale capable de franchir notre systeme solaire et d'étendre à jamais notre compréhension de la galaxie",
		type: IResearchType.CHASSIS,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 1 * MINUTES : 8 * MINUTES,
		required: [],
		researchBuildingLevel: 1,
		id: ResearchChassis.Navette
	},
	[ResearchChassis.Chasseur]: {
		name: "Chasse aux aliens",
		description:
			"Les récentes découvertes d'alien hostiles nous ont poussés à développer un chasseur spatial fiable et robuste, capable de défendre notre territoire et d'assurer la sécurité de nos explorations futures.",
		type: IResearchType.CHASSIS,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 3 * MINUTES : 3 * HOURS,
		required: [ResearchChassis.Navette],
		researchBuildingLevel: 1,
		id: ResearchChassis.Chasseur
	},
	[ResearchChassis.Corvette]: {
		name: "Corvette d'attaque",
		description:
			"La Corvette est notre réponse aux menaces croissantes dans l'espace. Conçue pour être rapide, agile et lourdement armée, elle est capable de mener des missions de reconnaissance et d'attaque avec une efficacité redoutable.",
		type: IResearchType.CHASSIS,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 8 * MINUTES : 18 * HOURS,
		required: [ResearchChassis.Chasseur],
		researchBuildingLevel: 2,
		id: ResearchChassis.Corvette
	},
	[ResearchChassis.Fregate]: {
		name: "Frégate de combat",
		description:
			"De récentes avancées dans la propulsion spatiale nous ont permis de développer la Frégate, un vaisseau de combat polyvalent capable de soutenir des missions prolongées et de fournir un appui-feu conséquent.",
		type: IResearchType.CHASSIS,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 12 * MINUTES
				: 10 * HOURS + 2 * DAYS,
		required: [ResearchChassis.Corvette, ResearchPropulsion.WARP2],
		researchBuildingLevel: 2,
		id: ResearchChassis.Fregate
	},
	[ResearchChassis.Destroyer]: {
		name: "Destroyer lourd",
		description:
			"Le Destroyer est le summum de notre technologie militaire spatiale. Conçu pour dominer les champs de bataille, il est équipé des systèmes d'armement et de défense les plus avancés, assurant une supériorité totale.",
		type: IResearchType.CHASSIS,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 15 * MINUTES
				: 7 * DAYS + 3 * HOURS,
		required: [ResearchChassis.Fregate, ResearchDefense.COQUE2],
		researchBuildingLevel: 3,
		id: ResearchChassis.Destroyer
	},
	[ResearchChassis.Croiseur]: {
		name: "Le vaisseau léger le plus efficace",
		description:
			"Parfait mélange entre rapidité et solidité, le croiseur est un concentré de technologie avancée. Conçu pour exceller dans des missions variées, il combine une vitesse impressionnante avec une robustesse à toute épreuve, faisant de lui un atout indispensable pour toute flotte spatiale.",
		type: IResearchType.CHASSIS,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 30 * MINUTES
				: 8 * DAYS + 11 * HOURS,
		required: [
			ResearchChassis.Destroyer,
			ResearchPropulsion.WARP3,
			ResearchDefense.SHIELD2,
			ResearchCargo.CARGOM
		],
		researchBuildingLevel: 4,
		id: ResearchChassis.Croiseur
	},
	[ResearchChassis.Intercepteur]: {
		name: "Intercepteur",
		description:
			"L'Intercepteur est un vaisseau de combat léger conçu pour intercepter et neutraliser les menaces spatiales.",
		type: IResearchType.CHASSIS,
		time: 12 * DAYS + 10 * HOURS,
		required: [ResearchChassis.Croiseur],
		researchBuildingLevel: 4,
		id: ResearchChassis.Intercepteur
	},
	[ResearchChassis.Croiseur_intergalactique]: {
		name: "Croiseur Intergalactique",
		description:
			"Le Croiseur Intergalactique est un vaisseau de combat léger conçu pour intercepter et neutraliser les menaces spatiales.",
		type: IResearchType.CHASSIS,
		time: 15 * DAYS + 2 * HOURS,
		required: [ResearchChassis.Intercepteur],
		researchBuildingLevel: 4,
		id: ResearchChassis.Croiseur_intergalactique
	},
	[ResearchChassis.Croiseur_combat]: {
		name: "Croiseur de combat",
		description:
			"Le Croiseur de combat est un vaisseau de combat léger conçu pour intercepter et neutraliser les menaces spatiales.",
		type: IResearchType.CHASSIS,
		time: 17 * DAYS,
		required: [ResearchChassis.Croiseur_intergalactique],
		researchBuildingLevel: 5,
		id: ResearchChassis.Croiseur_combat
	},
	[ResearchChassis.Warrior]: {
		name: "Warrior",
		description:
			"Le warrior est un dérivé du croiseur de combat optimisé pour les missions de combat.",
		type: IResearchType.CHASSIS,
		timee: 21 * DAYS,
		required: [ResearchChassis.Croiseur_combat],
		researchBuildingLevel: 5,
		id: ResearchChassis.Warrior
	},
	[ResearchChassis.Centaure]: {
		name: "Centaure",
		description:
			"Le Centaure est basé sur la nouvelle architecture B413-R, il est plus rapide et plus résistant que les autres vaisseaux.",
		type: IResearchType.CHASSIS,
		time: 25 * DAYS,
		required: [ResearchChassis.Warrior],
		researchBuildingLevel: 6,
		id: ResearchChassis.Centaure
	},
	[ResearchChassis.Minotaure]: {
		name: "Minotaure",
		description:
			"Le Minotaure cumule les avantages du Centaure et du Warrior, il est plus rapide et plus résistant que les autres vaisseaux.",
		type: IResearchType.CHASSIS,
		time: 29 * DAYS,
		required: [ResearchChassis.Centaure],
		researchBuildingLevel: 6,
		id: ResearchChassis.Minotaure
	},
	[ResearchChassis.Titan]: {
		name: "Titan",
		description:
			"Le Titan est le vaisseau le plus puissant de notre armée spatiale, il est plus rapide et plus résistant que les autres vaisseaux.",
		type: IResearchType.CHASSIS,
		time: 35 * DAYS,
		required: [ResearchChassis.Minotaure],
		researchBuildingLevel: 7,
		id: ResearchChassis.Titan
	},
	[ResearchChassis.Behemot]: {
		name: "Behemot",
		description:
			"Le Behemot est le vaisseau le plus puissant de notre armée spatiale, il est plus rapide et plus résistant que les autres vaisseaux.",
		type: IResearchType.CHASSIS,
		time: 40 * DAYS,
		required: [ResearchChassis.Titan],
		researchBuildingLevel: 7,
		id: ResearchChassis.Behemot
	},
	[ResearchChassis.Hades]: {
		name: "Hades",
		description:
			"Le Hades est le vaisseau le plus puissant de notre armée spatiale, il est plus rapide et plus résistant que les autres vaisseaux.",
		type: IResearchType.CHASSIS,
		time: 45 * DAYS,
		required: [ResearchChassis.Behemot],
		researchBuildingLevel: 8,
		id: ResearchChassis.Hades
	},
	[ResearchChassis.Leviathan]: {
		name: "Leviathan",
		description:
			"Le Leviathan est le vaisseau le plus puissant de notre armée spatiale, il est plus rapide et plus résistant que les autres vaisseaux.",
		type: IResearchType.CHASSIS,
		time: 50 * DAYS,
		required: [ResearchChassis.Hades],
		researchBuildingLevel: 9,
		id: ResearchChassis.Leviathan
	}
} as Record<string, IResearch>
