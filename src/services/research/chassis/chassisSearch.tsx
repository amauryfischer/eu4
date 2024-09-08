import { IResearchType } from "@/type/data/IResearch"

export const ResearchChassis = {
	Apollo: "Apollo",
	Artemis: "Artemis"
}

export const chassisSearch = {
	[ResearchChassis.Apollo]: {
		name: "Apollo, la beauté à un prix",
		description:
			"Nos scientifiques ont trouvé un moyen révolutionnaire de restructurer la coque de nos artemis, le vaisseaux est plus spacieux, tire mieux profis de ses réacteurs, et son design fait palire d'envie vos ennemies. Qu'attendons nous pour en construire toute une flotte ?",
		type: IResearchType.CHASSIS,
		time: 220,
		required: [ResearchChassis.Artemis],
		id: ResearchChassis.Apollo
	},
	[ResearchChassis.Artemis]: {
		name: "Artemis, le fiable",
		description:
			"La conception de la navette à du être réalisé dans l'urgence par nos physiciens pour répondre à la demande immédiate de conquête spatiale, ceux-çi on collecté une grande quantité d'informations sur la conception de vaisseaux spatiaux qu'ils n'ont pas pu mettre en place faute de temps. Ils ont compilé toutes ses données dans un dossier top secret nommé 'projet Artémis'",
		type: IResearchType.CHASSIS,
		time: 100,
		require: [],
		id: ResearchChassis.Artemis
	}
}
