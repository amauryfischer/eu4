import { IResearchType } from "@/type/data/IResearch"

export const ResearchCargo = {
	CARGOM: "cargom",
	CARGOL: "cargol",
	CARGOXL: "cargoxl",
	CARGOXL230: "cargoxl230"
}

export const cargoSearch = {
	[ResearchCargo.CARGOM]: {
		name: "Répartition de la charge",
		description:
			"Nos scientifiques ont découvert que la répartition de la charge dans les cargos pouvait être optimisée pour augmenter la capacité de charge des cargos tout en améliorant leur résistance aux radiations cosmiques.",
		type: IResearchType.CARGO,
		time: 100,
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
		required: [ResearchCargo.CARGOXL230]
	}
}
