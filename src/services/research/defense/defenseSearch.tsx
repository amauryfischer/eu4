import { IResearchType } from "@/type/data/IResearch"

export const ResearchDefense = {
	SHIELD2: "SHIELD2",
	COQUE2: "COQUE2"
}

export const defenseSearch = {
	[ResearchDefense.SHIELD2]: {
		name: "Renforcement des boucliers énergétiques",
		description:
			"Des recherches avancées sur le renforcement des champs énergétiques ont permis de créer des boucliers avec une capacité d'absorption d'énergie accrue.",
		type: IResearchType.DEFENSE,
		time: 180,
		required: [],
		id: ResearchDefense.SHIELD2
	},
	[ResearchDefense.COQUE2]: {
		name: "Matériaux de coque améliorés",
		description:
			"En utilisant de nouveaux composites et alliages, les ingénieurs ont créé des coques plus résistantes et durables pour les vaisseaux.",
		type: IResearchType.DEFENSE,
		time: 220,
		required: [],
		id: ResearchDefense.COQUE2
	}
}
