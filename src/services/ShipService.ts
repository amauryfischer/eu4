import IShipDesign from "@/type/data/IShipDesign"
import { RESOURCE_TYPES } from "./ResourcesService"
import { Research } from "./research/ResearchService"
import IShip from "@/type/data/IShip"
import { IModifier } from "@/type/data/IModule"
import { HOURS, MINUTES } from "@/utils/time"
import { ResearchChassis } from "./research/chassis/chassisSearch"

const getAllShips: () => { [name: string]: IShipDesign } = () => ({
	// polished
	sonde: {
		name: "Sonde",
		class: "sonde",
		img: "/images/chassis/sonde.webp",
		emplacement: 1,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 1,
		classType: "A",
		requiredResearch: [],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	navette: {
		name: "Navette",
		class: "navette",
		img: "/images/chassis/navette.webp",
		emplacement: 10,
		fuelSpace: 10_000,
		multiplier: {
			warp: 1.0,
			impulse: 4.0,
			conso: 1,
			shield: 1
		},
		baseCoque: 100,
		agility: 100,
		constructTime: 2 * HOURS + 56 * MINUTES,
		classType: "A",
		requiredResearch: [ResearchChassis.Navette],
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 1_000,
			[RESOURCE_TYPES.FER]: 450,
			[RESOURCE_TYPES.ALUMINUM]: 200,
			[RESOURCE_TYPES.SILICIUM]: 750,
			[RESOURCE_TYPES.URANIUM]: 0,
			[RESOURCE_TYPES.AZOTE]: 100,
			[RESOURCE_TYPES.HYDROGENE]: 500
		}
	},
	chasseur: {
		name: "Chasseur",
		class: "chasseur",
		img: "/images/chassis/chasseur.webp",
		emplacement: 15,
		fuelSpace: 15_000,
		multiplier: {
			warp: 0.9,
			impulse: 3.5,
			conso: 1,
			shield: 1
		},
		baseCoque: 150,
		agility: 95,
		constructTime: 3 * HOURS + 55 * MINUTES,
		classType: "A",
		requiredResearch: [ResearchChassis.Chasseur],
		cost: {
			[RESOURCE_TYPES.TITANE]: 1_500,
			[RESOURCE_TYPES.CUIVRE]: 1_800,
			[RESOURCE_TYPES.FER]: 400,
			[RESOURCE_TYPES.ALUMINUM]: 150,
			[RESOURCE_TYPES.SILICIUM]: 1_000,
			[RESOURCE_TYPES.AZOTE]: 700,
			[RESOURCE_TYPES.HYDROGENE]: 750
		}
	},
	corvette: {
		name: "Corvette",
		class: "corvette",
		img: "/images/chassis/corvette.webp",
		emplacement: 20,
		fuelSpace: 20_000,
		multiplier: {
			warp: 0.85,
			impulse: 2.5,
			conso: 1,
			shield: 1
		},
		baseCoque: 200,
		classType: "A",
		requiredResearch: [ResearchChassis.Corvette],
		agility: 90,
		constructTime: 5 * HOURS + 52 * MINUTES,
		cost: {
			[RESOURCE_TYPES.TITANE]: 1_800,
			[RESOURCE_TYPES.CUIVRE]: 2_750,
			[RESOURCE_TYPES.FER]: 50,
			[RESOURCE_TYPES.ALUMINUM]: 300,
			[RESOURCE_TYPES.SILICIUM]: 1_000,
			[RESOURCE_TYPES.AZOTE]: 900,
			[RESOURCE_TYPES.HYDROGENE]: 1_000
		}
	},
	fregate: {
		name: "Fregate",
		class: "fregate",
		img: "/images/chassis/fregate.webp",
		emplacement: 25,
		fuelSpace: 20_000,
		multiplier: {
			warp: 0.8,
			impulse: 1.8,
			conso: 1,
			shield: 1
		},
		agility: 85,
		baseCoque: 250,
		classType: "A",
		constructTime: 11 * HOURS + 45 * MINUTES,
		requiredResearch: [ResearchChassis.Fregate],
		cost: {
			[RESOURCE_TYPES.TITANE]: 2_500,
			[RESOURCE_TYPES.CUIVRE]: 2_550,
			[RESOURCE_TYPES.FER]: 250,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 1_000,
			[RESOURCE_TYPES.URANIUM]: 1_500,
			[RESOURCE_TYPES.AZOTE]: 1_200
		}
	},

	// fill stat with https://eu2opia.fandom.com/wiki/Frigate
	destroyer: {
		name: "Destroyer",
		class: "destroyer",
		img: "/images/chassis/destroyer.webp",
		emplacement: 30,
		fuelSpace: 20_000,
		multiplier: {
			warp: 0.85,
			impulse: 2.5,
			conso: 1,
			shield: 1
		},
		baseCoque: 300,
		classType: "A",
		agility: 80,
		constructTime: 11 * HOURS + 45 * MINUTES,
		requiredResearch: [ResearchChassis.Destroyer],
		cost: {
			[RESOURCE_TYPES.TITANE]: 3_000,
			[RESOURCE_TYPES.CUIVRE]: 2_500,
			[RESOURCE_TYPES.FER]: 750,
			[RESOURCE_TYPES.ALUMINUM]: 250,
			[RESOURCE_TYPES.MERCURE]: 1_000,
			[RESOURCE_TYPES.SILICIUM]: 1_500,
			[RESOURCE_TYPES.URANIUM]: 2_000,
			[RESOURCE_TYPES.AZOTE]: 1_500,
			[RESOURCE_TYPES.HYDROGENE]: 2_000
		}
	},
	croiseur: {
		name: "Croiseur",
		class: "croiseur",
		img: "/images/chassis/croiseur.webp",
		emplacement: 40,
		fuelSpace: 35_000,
		multiplier: {
			warp: 1.2,
			impulse: 1.0,
			conso: 1,
			shield: 1
		},
		agility: 70,
		constructTime: 11 * HOURS + 45 * MINUTES,
		baseCoque: 200,
		classType: "A",
		requiredResearch: [ResearchChassis.Croiseur],
		cost: {
			[RESOURCE_TYPES.TITANE]: 4_000,
			[RESOURCE_TYPES.CUIVRE]: 4_000,
			[RESOURCE_TYPES.FER]: 4_200,
			[RESOURCE_TYPES.ALUMINUM]: 500,
			[RESOURCE_TYPES.MERCURE]: 1_500,
			[RESOURCE_TYPES.SILICIUM]: 1_800,
			[RESOURCE_TYPES.URANIUM]: 3_000,
			[RESOURCE_TYPES.AZOTE]: 1_500,
			[RESOURCE_TYPES.HYDROGENE]: 2_000
		}
	},

	// ! todo edit cost
	intercepteur: {
		name: "Intercepteur",
		class: "intercepteur",
		img: "/images/chassis/intercepteur.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 1,
		classType: "A",
		requiredResearch: [ResearchChassis.Intercepteur],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},

	croiseur_intergalactique: {
		name: "Croiseur Intergalactique",
		class: "croiseur_intergalactique",
		img: "/images/chassis/croiseur_intergalactique.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "B",
		requiredResearch: [ResearchChassis.Croiseur_intergalactique],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	croiseur_combat: {
		name: "Croiseur Combat",
		class: "croiseur_combat",
		img: "/images/chassis/croiseur_combat.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "B",
		requiredResearch: [ResearchChassis.Croiseur_combat],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	warrior: {
		name: "Warrior",
		class: "warrior",
		img: "/images/chassis/warrior.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "B",
		requiredResearch: [ResearchChassis.Warrior],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	centaure: {
		name: "Centaure",
		class: "centaure",
		img: "/images/chassis/centaure.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "B",
		requiredResearch: [ResearchChassis.Centaure],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	minotaure: {
		name: "Minotaure",
		class: "minotaure",
		img: "/images/chassis/minotaure.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "B",
		requiredResearch: [ResearchChassis.Minotaure],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	titan: {
		name: "Titan",
		class: "titan",
		img: "/images/chassis/titan.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "C",
		requiredResearch: [ResearchChassis.Titan],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	behemoth: {
		name: "Behemoth",
		class: "behemoth",
		img: "/images/chassis/behemoth.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "C",
		requiredResearch: [ResearchChassis.Behemot],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	hades: {
		name: "Hades",
		class: "hades",
		img: "/images/chassis/hades.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "C",
		requiredResearch: [ResearchChassis.Hades],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	},
	leviathan: {
		name: "Leviathan",
		class: "leviathan",
		img: "/images/chassis/leviathan.webp",
		emplacement: 40,
		fuelSpace: 1000,
		multiplier: {
			warp: 10,
			impulse: 10,
			conso: 0.1,
			shield: 0
		},
		baseCoque: 400,
		classType: "C",
		requiredResearch: [ResearchChassis.Leviathan],
		cost: {
			[RESOURCE_TYPES.TITANE]: 150,
			[RESOURCE_TYPES.CUIVRE]: 250,
			[RESOURCE_TYPES.FER]: 500,
			[RESOURCE_TYPES.ALUMINUM]: 100,
			[RESOURCE_TYPES.SILICIUM]: 150,
			[RESOURCE_TYPES.AZOTE]: 50,
			[RESOURCE_TYPES.HYDROGENE]: 150
		}
	}
})

const getShipFullCoque = (ship: IShip) => {
	return (
		getAllStatFromModules({ ship, state: IModifier.COQUE }) +
		getAllShips()[ship.class].baseCoque
	)
}
const getShipFullShield = (ship: IShip) => {
	return getAllStatFromModules({ ship, state: IModifier.SHIELD })
}
const getAllStatFromModules = ({
	ship,
	state
}: { ship: IShip; state: IModifier }) => {
	if (!ship) {
		return 0
	}
	const modules = ship.modules
	const stateModifier = modules.reduce((acc, module) => {
		return acc + (module.modifier?.[state] ?? 0)
	}, 0)
	return stateModifier
}
export default {
	getAllShips,
	getAllStatFromModules,
	getShipFullCoque,
	getShipFullShield
}
