import { IResearchType } from "@/type/data/IResearch"
import { MINUTES } from "@/utils/time"

export const ResearchCargo = {
	CARGOM: "cargom",
	CARGOL: "cargol",
	CARGOXL: "cargoxl",
	CARGOXL230: "cargoxl230",
	CARGOXL270: "cargoxl270",
	CARGOMINI: "cargomini",
	CARGOJUMBO: "cargojumbo"
}

export const cargoSearch = {
	[ResearchCargo.CARGOM]: {
		name: "Répartition de la charge",
		description:
			"Nos scientifiques ont découvert que la répartition de la charge dans les cargos pouvait être optimisée pour augmenter la capacité de charge des cargos tout en améliorant leur résistance aux radiations cosmiques.",
		type: IResearchType.CARGO,
		time: 5 * MINUTES,
		required: [],
		id: ResearchCargo.CARGOM
	},
	[ResearchCargo.CARGOL]: {
		name: "Structure de stockage en alliage de titane renforcé",
		description:
			"Nos scientifiques pensent qu'en altérant la structure interne atomique du titane, ils peuvent augmenter significativement la capacité de charge des cargos de classe L tout en améliorant leur résistance aux radiations cosmiques.",
		type: IResearchType.CARGO,
		time: 200,
		required: [ResearchCargo.CARGOM],
		id: ResearchCargo.CARGOL
	},
	[ResearchCargo.CARGOXL]: {
		name: "Système de stockage par confinement magnétique avancé",
		description:
			"Nos chercheurs ont imaginé les plans d'un système de confinement magnétique avancé pour les cargos de classe XL, permettant de stabiliser des charges massives et de réduire les risques de défaillance structurelle lors des voyages interstellaires prolongés.",
		type: IResearchType.CARGO,
		time: 300,
		required: [ResearchCargo.CARGOL],
		id: ResearchCargo.CARGOXL
	},
	[ResearchCargo.CARGOXL230]: {
		name: "Optimisation de stockage 230K",
		description: "Optimisation de stockage 230K",
		type: IResearchType.CARGO,
		time: 350,
		required: [ResearchCargo.CARGOXL],
		id: ResearchCargo.CARGOXL230
	},
	[ResearchCargo.CARGOXL270]: {
		name: "Optimisation de stockage 270K",
		description: "Optimisation de stockage 270K",
		type: IResearchType.CARGO,
		time: 350,
		required: [ResearchCargo.CARGOXL230],
		id: ResearchCargo.CARGOXL270
	},
	[ResearchCargo.CARGOMINI]: {
		name: "Optimisation de stockage mini",
		description: "Optimisation de stockage mini",
		type: IResearchType.CARGO,
		time: 350,
		required: [ResearchCargo.CARGOXL270],
		id: ResearchCargo.CARGOMINI
	},
	[ResearchCargo.CARGOJUMBO]: {
		name: "Optimisation de stockage jumbo",
		description: "Optimisation de stockage jumbo",
		type: IResearchType.CARGO,
		time: 350,
		required: [ResearchCargo.CARGOMINI],
		id: ResearchCargo.CARGOJUMBO
	}
}
