import IShipDesign from "@/type/data/IShipDesign"
import { RESOURCE_TYPES } from "./ResourcesService"
import { Research } from "./research/ResearchService"
import IShip from "@/type/data/IShip"
import { IModifier } from "@/type/data/IModule"

const getAllShips: () => { [name: string]: IShipDesign } = () => ({
	apollo: {
		name: "Apollo",
		class: "apollo",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.HYDROGENE]: 100
		},
		img: "/images/enhanced/apollo.webp",
		emplacement: 10,
		fuelSpace: 25_000,
		multiplier: {
			warp: 1,
			impulse: 1,
			conso: 1
		},
		baseCoque: 100,
		classType: "A",
		requiredResearch: [Research.Apollo]
	},
	arc: {
		name: "Arc",
		class: "arc",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000,
			[RESOURCE_TYPES.HYDROGENE]: 100,
			[RESOURCE_TYPES.FER]: 100
		},
		img: "/images/enhanced/arc.webp",
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	artemis: {
		name: "Artemis",
		class: "artemis",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		img: "/images/enhanced/artemis.webp",
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A",
		requiredResearch: [Research.Artemis]
	},
	athena: {
		name: "Athena",
		class: "athena",
		img: "/images/enhanced/athena.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	atlas: {
		name: "Atlas",
		class: "atlas",
		img: "/images/enhanced/atlas.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	centaure: {
		name: "Centaure",
		class: "centaure",
		img: "/images/enhanced/centaure.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	chasseur: {
		name: "Chasseur",
		class: "chasseur",
		img: "/images/enhanced/chasseur.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	croiseur_intergalactique: {
		name: "Croiseur Intergalactique",
		class: "croiseur_intergalactique",
		img: "/images/enhanced/croiseur_intergalactique.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "D"
	},
	croiseur: {
		name: "Croiseur",
		class: "croiseur",
		img: "/images/enhanced/croiseur.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	destroyer: {
		name: "Destroyer",
		class: "destroyer",
		img: "/images/enhanced/destroyer.webp",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "D"
	},
	dionysos: {
		name: "Dionysos",
		class: "dionysos",
		img: "/images/enhanced/dionysos.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	docker: {
		name: "Docker",
		class: "docker",
		img: "/images/enhanced/docker.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	enigma: {
		name: "Enigma",
		class: "enigma",
		img: "/images/enhanced/enigma.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	eros: {
		name: "Eros",
		class: "eros",
		img: "/images/enhanced/eros.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	fregate: {
		name: "Fregate",
		class: "fregate",
		img: "/images/enhanced/fregate.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	frozen: {
		name: "Frozen",
		class: "frozen",
		img: "/images/enhanced/frozen.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	helios: {
		name: "Helios",
		class: "helios",
		img: "/images/enhanced/helios.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	hera: {
		name: "Hera",
		class: "hera",
		img: "/images/enhanced/hera.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	hercules: {
		name: "Hercules",
		class: "hercules",
		img: "/images/enhanced/hercules.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	hermes: {
		name: "Hermes",
		class: "hermes",
		img: "/images/enhanced/hermes.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	intercepteur: {
		name: "Intercepteur",
		class: "intercepteur",
		img: "/images/enhanced/intercepteur.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	karfus: {
		name: "Karfus",
		class: "karfus",
		img: "/images/enhanced/karfus.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	legend: {
		name: "Legend",
		class: "legend",
		img: "/images/enhanced/legend.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	leviathan: {
		name: "Leviathan",
		class: "leviathan",
		img: "/images/enhanced/leviathan.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	loki: {
		name: "Loki",
		class: "loki",
		img: "/images/enhanced/loki.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "D"
	},
	luna: {
		name: "Luna",
		class: "luna",
		img: "/images/enhanced/luna.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	mega_transporteur: {
		name: "Mega-Transporteur",
		class: "mega-transporteur",
		img: "/images/enhanced/mega_transporteur.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "D"
	},
	minotaure: {
		name: "Minotaure",
		class: "minotaure",
		img: "/images/enhanced/minotaure.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	navette: {
		name: "Navette",
		class: "navette",
		img: "/images/enhanced/navette.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	nimbus: {
		name: "Nimbus",
		class: "nimbus",
		img: "/images/enhanced/nimbus.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	oblirator: {
		name: "Oblirator",
		class: "oblirator",
		img: "/images/enhanced/oblirator.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	odin: {
		name: "Odin",
		class: "odin",
		img: "/images/enhanced/odin.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	pallas: {
		name: "Pallas",
		class: "pallas",
		img: "/images/enhanced/pallas.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	patrouilleur: {
		name: "Patrouilleur",
		class: "patrouilleur",
		img: "/images/enhanced/patrouilleur.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	proleyend: {
		name: "Proleyend",
		class: "proleyend",
		img: "/images/enhanced/proleyend.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	proteus: {
		name: "Proteus",
		class: "proteus",
		img: "/images/enhanced/proteus.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	proto: {
		name: "Proto",
		class: "proto",
		img: "/images/enhanced/proto.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	saracen: {
		name: "Saracen",
		class: "saracen",
		img: "/images/enhanced/saracen.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	sonde: {
		name: "Sonde",
		class: "sonde",
		img: "/images/enhanced/sonde.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	station: {
		name: "Station",
		class: "station",
		img: "/images/enhanced/station.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	},
	tethys: {
		name: "Tethys",
		class: "tethys",
		img: "/images/enhanced/tethys.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	thor: {
		name: "Thor",
		class: "thor",
		img: "/images/enhanced/thor.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	titan: {
		name: "Titan",
		class: "titan",
		img: "/images/enhanced/titan.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "D"
	},
	transporteur: {
		name: "Transporteur",
		class: "transporteur",
		img: "/images/enhanced/transporteur.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	triton: {
		name: "Triton",
		class: "triton",
		img: "/images/enhanced/triton.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "C"
	},
	tyran: {
		name: "Tyran",
		class: "tyran",
		img: "/images/enhanced/tyran.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "D"
	},
	valkyrie: {
		name: "Valkyrie",
		class: "valkyrie",
		img: "/images/enhanced/valkyrie.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	virus: {
		name: "Virus",
		class: "virus",
		img: "/images/enhanced/virus.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	vortex: {
		name: "Vortex",
		class: "vortex",
		img: "/images/enhanced/vortex.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "B"
	},
	voyager: {
		name: "Voyager",
		class: "voyager",
		img: "/images/enhanced/voyager.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "A"
	},
	zeus: {
		name: "Zeus",
		class: "zeus",
		img: "/images/enhanced/zeus.png",
		cost: {
			[RESOURCE_TYPES.TITANE]: 500,
			[RESOURCE_TYPES.CUIVRE]: 500,
			[RESOURCE_TYPES.AZOTE]: 8000
		},
		emplacement: 100,
		fuelSpace: 150_000,
		multiplier: {
			warp: 0.25,
			impulse: 0.3,
			conso: 15
		},
		baseCoque: 1000,
		classType: "station"
	}
})
const getAllStatFromModules = ({
	ship,
	state
}: { ship: IShip; state: IModifier }) => {
	const modules = ship.modules
	const stateModifier = modules.reduce((acc, module) => {
		return acc + (module.modifier?.[state] ?? 0)
	}, 0)
	return stateModifier
}
export default {
	getAllShips,
	getAllStatFromModules
}
