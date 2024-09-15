import { IResearchType } from "@/type/data/IResearch"
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
	Croiseur: "Croiseur"
}

export const chassisSearch = {
	[ResearchChassis.Navette]: {
		name: "Programme de découverte spatiale",
		description:
			"Notre programme de recherche étant focalisé sur l'exploration spatiale depuis la récente découverte d'alien, nous avons orienté la totalité de nos scientifiques sur un programme commun, la céation d'une navette spatiale capable de franchir notre systeme solaire et d'étendre à jamais notre compréhension de la galaxie",
		type: IResearchType.CHASSIS,
		time: 8 * MINUTES,
		required: [],
		researchBuildingLevel: 1,
		id: ResearchChassis.Navette
	},
	[ResearchChassis.Chasseur]: {
		name: "Chasse aux aliens",
		description:
			"Les récentes découvertes d'alien hostiles nous ont poussés à développer un chasseur spatial fiable et robuste, capable de défendre notre territoire et d'assurer la sécurité de nos explorations futures.",
		type: IResearchType.CHASSIS,
		time: 3 * HOURS,
		require: [ResearchChassis.Navette],
		researchBuildingLevel: 1,
		id: ResearchChassis.Chasseur
	},
	[ResearchChassis.Corvette]: {
		name: "Corvette d'attaque",
		description:
			"La Corvette est notre réponse aux menaces croissantes dans l'espace. Conçue pour être rapide, agile et lourdement armée, elle est capable de mener des missions de reconnaissance et d'attaque avec une efficacité redoutable.",
		type: IResearchType.CHASSIS,
		time: 18 * HOURS,
		require: [ResearchChassis.Chasseur],
		researchBuildingLevel: 2,
		id: ResearchChassis.Corvette
	},
	[ResearchChassis.Fregate]: {
		name: "Frégate de combat",
		description:
			"De récentes avancées dans la propulsion spatiale nous ont permis de développer la Frégate, un vaisseau de combat polyvalent capable de soutenir des missions prolongées et de fournir un appui-feu conséquent.",
		type: IResearchType.CHASSIS,
		time: 10 * HOURS + 2 * DAYS,
		require: [ResearchChassis.Corvette, ResearchPropulsion.WARP2],
		researchBuildingLevel: 2,
		id: ResearchChassis.Fregate
	},
	[ResearchChassis.Destroyer]: {
		name: "Destroyer lourd",
		description:
			"Le Destroyer est le summum de notre technologie militaire spatiale. Conçu pour dominer les champs de bataille, il est équipé des systèmes d'armement et de défense les plus avancés, assurant une supériorité totale.",
		type: IResearchType.CHASSIS,
		time: 7 * DAYS + 3 * HOURS,
		require: [ResearchChassis.Fregate, ResearchDefense.COQUE2],
		researchBuildingLevel: 3,
		id: ResearchChassis.Destroyer
	},
	[ResearchChassis.Croiseur]: {
		name: "Le vaisseau léger le plus efficace",
		description:
			"Parfait mélange entre rapidité et solidité, le croiseur est un concentré de technologie avancée. Conçu pour exceller dans des missions variées, il combine une vitesse impressionnante avec une robustesse à toute épreuve, faisant de lui un atout indispensable pour toute flotte spatiale.",
		type: IResearchType.CHASSIS,
		time: 8 * DAYS + 11 * HOURS,
		require: [
			ResearchChassis.Destroyer,
			ResearchPropulsion.WARP3,
			ResearchDefense.SHIELD2,
			ResearchCargo.CARGOM
		],
		researchBuildingLevel: 4,
		id: ResearchChassis.Croiseur
	}
}
