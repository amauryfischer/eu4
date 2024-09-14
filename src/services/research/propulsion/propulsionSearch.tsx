import { IResearchType } from "@/type/data/IResearch"

export const ResearchPropulsion = {
	WARP2: "WARP2",
	WARP3: "WARP3",
	WARP4: "WARP4"
}

export const propulsionSearch = {
	[ResearchPropulsion.WARP2]: {
		name: "Refroidissement warp avancé",
		description:
			"Les scientifiques ont conçu un nouveau système de refroidissement pour les moteurs warp, augmentant leur efficacité et permettant des voyages plus longs sans surchauffe.",
		type: IResearchType.ENGINE,
		time: 200,
		required: [],
		id: ResearchPropulsion.WARP2
	},
	[ResearchPropulsion.WARP3]: {
		name: "Optimisation de la distorsion spatiale",
		description:
			"En optimisant la distorsion spatiale générée par les moteurs warp, les ingénieurs ont réussi à réduire la consommation d'énergie et augmenter la vitesse maximale.",
		type: IResearchType.ENGINE,
		time: 300,
		required: [ResearchPropulsion.WARP2],
		id: ResearchPropulsion.WARP3
	},
	[ResearchPropulsion.WARP4]: {
		name: "Système de stabilisation multidimensionnelle",
		description:
			"Ce système de stabilisation avancé permet aux moteurs warp de naviguer dans des conditions spatiales difficiles, augmentant la sécurité et la fiabilité.",
		type: IResearchType.ENGINE,
		time: 400,
		required: [ResearchPropulsion.WARP3],
		id: ResearchPropulsion.WARP4
	}
}
