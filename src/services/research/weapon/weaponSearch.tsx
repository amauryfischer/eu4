



import { IResearchType } from "@/type/data/IResearch"
import { DAYS, HOURS, MINUTES } from "@/utils/time"
import { ResearchChassis } from "../chassis/chassisSearch"

export const ResearchWeapon = {
	LASER2: "LASER2",
	LASER3: "LASER3",
	MINI_LASER: "MINI_LASER",
	LASER_JUMBO: "LASER_JUMBO",
	BALLISTA: "BALLISTA",
	SNIPER: "SNIPER",
	VENDETTA: "VENDETTA",
	MINI_BALLISTA: "MINI_BALLISTA",
	JUMBO_BALLISTA: "JUMBO_BALLISTA"
}

export const weaponSearch = {
	[ResearchWeapon.LASER2]: {
		name: "Amélioration de la focalisation laser",
		description:
			"Les avancées dans la technologie de focalisation des lasers permettent d'augmenter la puissance de destruction tout en maintenant une consommation d'énergie optimale.",
		type: IResearchType.WEAPON,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 3 * MINUTES : 3 * HOURS,
		required: [],
		id: ResearchWeapon.LASER2
	},
	[ResearchWeapon.LASER3]: {
		name: "Amplificateur de rayon laser",
		description:
			"Des recherches sur les amplificateurs de rayon laser ont permis de développer des lasers avec une cadence de tir plus élevée et une précision améliorée.",
		type: IResearchType.WEAPON,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 3 * MINUTES : 18 * HOURS,
		required: [ResearchWeapon.LASER2],
		id: ResearchWeapon.LASER3
	},
	[ResearchWeapon.MINI_LASER]: {
		name: "Mini laser",
		description:
			"Un laser très puissant, il peut détruire des vaisseaux avec une cadence élevée, mais est très imprécis",
		type: IResearchType.WEAPON,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 3 * MINUTES
				: 2 * DAYS + 12 * HOURS,
		required: [ResearchWeapon.LASER3, ResearchChassis.Croiseur_intergalactique],
		id: ResearchWeapon.MINI_LASER
	},
	[ResearchWeapon.LASER_JUMBO]: {
		name: "Laser jumbo",
		description:
			"Un laser surpuissant, il peut détruire des vaisseaux avec une cadence élevée, mais plus imprécis",
		type: IResearchType.WEAPON,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 3 * MINUTES
				: 7 * DAYS + 10 * HOURS,
		required: [ResearchWeapon.MINI_LASER, ResearchChassis.Hades],
		id: ResearchWeapon.LASER_JUMBO
	},
	[ResearchWeapon.BALLISTA]: {
		name: "Ballista",
		description:
			"Un lanceur de roquettes simple mais efficace, il inflige de lourds dégats à la coque des vaisseaux, mais les boucliers ne sont presque pas affectés",
		type: IResearchType.WEAPON,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 3 * MINUTES : 6 * HOURS,
		required: [ResearchWeapon.LASER2],
		id: ResearchWeapon.BALLISTA
	},
	[ResearchWeapon.SNIPER]: {
		name: "Sniper",
		description:
			"Un lanceur de roquettes simple mais efficace, il inflige de lourds dégats à la coque des vaisseaux, mais les boucliers ne sont presque pas affectés",
		type: IResearchType.WEAPON,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 3 * MINUTES
				: 1 * DAYS + 7 * HOURS,
		required: [ResearchWeapon.BALLISTA],
		id: ResearchWeapon.SNIPER
	},
	[ResearchWeapon.VENDETTA]: {
		name: "Vendetta",
		description:
			"Un lanceur de roquettes optimisé, il envoie des missiles de type A123-O qui sont très précis mais cause des dégats modérés",
		type: IResearchType.WEAPON,
		time:
			process.env.NEXT_PUBLIC_FAST === "true"
				? 3 * MINUTES
				: 2 * DAYS + 1 * HOURS,
		required: [ResearchWeapon.SNIPER],
		id: ResearchWeapon.VENDETTA
	},
	[ResearchWeapon.MINI_BALLISTA]: {
		name: "Mini ballista",
		description:
			"Un puissant lanceur de roquettes miniaturisé, il inflige de très lourds dégats à la coque des vaisseaux, mais les boucliers ne sont presque pas affectés",
		type: IResearchType.WEAPON,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 3 * MINUTES : 5 * DAYS,
		required: [ResearchWeapon.VENDETTA],
		id: ResearchWeapon.MINI_BALLISTA
	},
	[ResearchWeapon.JUMBO_BALLISTA]: {
		name: "Jumbo ballista",
		description:
			"Le Jumbo Ballista, fruit de décennies de recherche par les ingénieurs militaires de la Corporation Orion, représente l'apogée de la technologie des lanceurs de roquettes. Cette arme colossale, capable de tirer des salves de missiles guidés à tête chercheuse, peut réduire en poussière la coque des plus grands vaisseaux de guerre. Cependant, son efficacité contre les boucliers énergétiques reste limitée, ce qui en fait une arme de choix pour les attaques surprises et les embuscades spatiales. Son déploiement est souvent considéré comme un tournant décisif dans tout conflit interstellaire.",
		type: IResearchType.WEAPON,
		time: process.env.NEXT_PUBLIC_FAST === "true" ? 3 * MINUTES : 10 * DAYS,
		required: [ResearchWeapon.MINI_BALLISTA],
		id: ResearchWeapon.JUMBO_BALLISTA
	}
}
