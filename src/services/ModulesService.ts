import { IModifier, IModule } from "@/type/data/IModule"
import {
  ALUMINUM,
  AZOTE,
  CUIVRE,
  FER,
  HYDROGENE,
  SILICIUM,
  TITANE,
  URANIUM,
} from "./ResourcesService"

const ENGINE = "engine"
export enum IModuleType {
  ENGINE = "engine",
  DEFENSE = "defense",
  WEAPON = "weapon",
  CARGO = "cargo",
  OTHER = "other",
}
const getAllModules: () => { [name: string]: IModule } = () => ({
  cargos: {
    id: "cargos",
    name: "Cargo S",
    description:
      // TODO replace lorem
      "Un cargo de base, il peut contenir 10 000 ressources différentes",
    img: "/images/modules/cargo/cargo_s.webp",
    type: IModuleType.CARGO,
    emplacement: 5,
    modifier: {
      [IModifier.CARGO]: 10_000,
      [IModifier.CONSO]: 100,
    },
    cost: {
      [TITANE.name]: 1_500,
      [CUIVRE.name]: 3_000,
      [AZOTE.name]: 800,
      [FER.name]: 1_400,
      [SILICIUM.name]: 3_800,
    },
  },
  cargom: {
    id: "cargom",
    name: "Cargo M",
    // TODO replace lorem
    description:
      "Un cargo moyen, il peut contenir 25 000 ressources différentes",
    img: "/images/modules/cargo/cargo_m.webp",
    type: IModuleType.CARGO,
    emplacement: 10,
    modifier: {
      [IModifier.CARGO]: 25_000,
      [IModifier.CONSO]: 200,
    },
    cost: {
      [TITANE.name]: 3_500,
      [CUIVRE.name]: 7_000,
      [AZOTE.name]: 2_00,
      [FER.name]: 3_000,
      [SILICIUM.name]: 5_900,
    },
  },
  cargoL: {
    id: "cargoL",
    name: "Cargo L",
    // TODO replace lorem
    description:
      "Un cargo lourd, il peut contenir 50 000 ressources différentes",
    img: "/images/modules/cargo/cargo_l.webp",
    type: IModuleType.CARGO,
    emplacement: 10,
    modifier: {
      [IModifier.CARGO]: 50_000,
      [IModifier.CONSO]: 300,
    },
    cost: {
      [TITANE.name]: 3_500,
      [CUIVRE.name]: 7_000,
      [AZOTE.name]: 2_00,
      [FER.name]: 3_000,
      [SILICIUM.name]: 5_900,
    },
  },
  cargoXL: {
    id: "cargoXL",
    name: "Cargo XL",
    // TODO replace lorem
    description:
      "Un cargo immense, il peut contenir 100 000 ressources différentes",
    img: "/images/modules/cargo/cargo_xl.webp",
    type: IModuleType.CARGO,
    emplacement: 10,
    modifier: {
      [IModifier.CARGO]: 100_000,
      [IModifier.CONSO]: 200,
    },
    cost: {
      [TITANE.name]: 3_500,
      [CUIVRE.name]: 7_000,
      [AZOTE.name]: 2_00,
      [FER.name]: 3_000,
      [SILICIUM.name]: 5_900,
    },
  },
  laser1: {
    id: "laser1",
    name: "Laser 1",
    description:
      "Un laser de base, il peut détruire des vaisseaux avec une cadence faible, mais est étonnamment précis",
    img: "/images/modules/weapons/laser1.png",
    type: IModuleType.WEAPON,
    emplacement: 1,
    modifier: {
      [IModifier.LASER]: 10,
      [IModifier.CONSO]: 100,
    },
    cost: {
      [TITANE.name]: 1_500,
      [CUIVRE.name]: 3_000,
      [AZOTE.name]: 800,
      [FER.name]: 1_400,
      [SILICIUM.name]: 3_800,
    },
  },
  laser2: {
    id: "laser2",
    name: "Laser 2",
    description:
      "Un laser plus puissant, il peut détruire des vaisseaux avec une cadence moyenne, mais est moins précis",
    img: "/images/modules/weapons/laser3.png",
    type: IModuleType.WEAPON,
    emplacement: 1,
    modifier: {
      [IModifier.LASER]: 20,
      [IModifier.CONSO]: 200,
    },
    cost: {
      [TITANE.name]: 3_500,
      [CUIVRE.name]: 7_000,
      [AZOTE.name]: 2_00,
      [FER.name]: 3_000,
      [SILICIUM.name]: 5_900,
    },
  },
  laser3: {
    id: "laser3",
    name: "Laser 3",
    description:
      "Un laser puissant, il peut détruire des vaisseaux avec une cadence élevée, mais est très imprécis",
    img: "/images/modules/weapons/laser5.png",
    type: IModuleType.WEAPON,
    emplacement: 1,
    modifier: {
      [IModifier.LASER]: 30,
      [IModifier.CONSO]: 300,
    },
    cost: {
      [TITANE.name]: 3_500,
      [CUIVRE.name]: 7_000,
      [AZOTE.name]: 2_00,
      [FER.name]: 3_000,
      [SILICIUM.name]: 5_900,
    },
  },
  gps1: {
    id: "gps1",
    name: "GPS 1",
    // TODO replace lorem
    description:
      "Ce moteur a été conçu pour les vaisseaux de petite taille et de faible puissance, il a été conçu par l'entreprise Deltan",
    type: IModuleType.ENGINE,
    img: "/images/modules/engines/propuls1.webp",
    emplacement: 1,
    modifier: {
      [IModifier.IMPULSION]: 50,
      [IModifier.CONSO]: 10,
    },
    cost: {
      [TITANE.name]: 1_000,
      [CUIVRE.name]: 1_200,
      [AZOTE.name]: 2_000,
      [URANIUM.name]: 4_400,
      [HYDROGENE.name]: 1_300,
    },
  },

  gps2: {
    id: "gps2",
    name: "GPS 2",
    // TODO replace lorem
    description:
      "La nouvelle génération de moteur conçu par Deltan, ce nouveau moteur est plus puissant et consomme moins",
    type: IModuleType.ENGINE,
    img: "/images/modules/engines/propuls2.webp",
    emplacement: 2,
    modifier: {
      [IModifier.IMPULSION]: 120,
      [IModifier.CONSO]: 22,
    },
    cost: {
      [TITANE.name]: 3_000,
      [CUIVRE.name]: 4_000,
      [AZOTE.name]: 5_000,
      [URANIUM.name]: 8_000,
      [HYDROGENE.name]: 3_000,
    },
  },
  warp1: {
    id: "warp1",
    name: "Warp 1",
    // TODO replace lorem
    description:
      "Le premier moteur warp, il permet de voyager dans l'espace en quelques secondes",
    type: IModuleType.ENGINE,
    img: "/images/modules/engines/DX2.webp",
    emplacement: 3,
    modifier: {
      [IModifier.WARP]: 100,
      [IModifier.CONSO]: 100,
    },
    cost: {
      [TITANE.name]: 1_000,
      [CUIVRE.name]: 10_000,
      [AZOTE.name]: 1_300,
      [URANIUM.name]: 6_000,
      [HYDROGENE.name]: 1_500,
    },
  },
  warp2: {
    id: "warp2",
    name: "Warp 2",
    // TODO replace lorem
    description:
      "Un moteur warp plus puissant que le précédent, son nouveau systeme de refroidissement permet de le faire fonctionner plus longtemps, pour un meilleur rendement",
    type: IModuleType.ENGINE,
    img: "/images/modules/engines/DX3.webp",
    emplacement: 6,
    modifier: {
      [IModifier.WARP]: 200,
      [IModifier.CONSO]: 190,
    },
    cost: {
      [TITANE.name]: 2_000,
      [CUIVRE.name]: 20_000,
      [AZOTE.name]: 2_300,
      [URANIUM.name]: 9_000,
      [HYDROGENE.name]: 6_500,
      [FER.name]: 7_500,
    },
  },
  warp3: {
    id: "warp3",
    name: "Warp 3",
    // TODO replace lorem
    description:
      "Un moteur warp plus puissant que le précédent, son nouveau systeme de refroidissement permet de le faire fonctionner plus longtemps, pour un meilleur rendement",
    type: IModuleType.ENGINE,
    img: "/images/modules/engines/DX4.webp",
    emplacement: 6,
    modifier: {
      [IModifier.WARP]: 400,
      [IModifier.CONSO]: 370,
    },
    cost: {
      [TITANE.name]: 2_000,
      [CUIVRE.name]: 20_000,
      [AZOTE.name]: 2_300,
      [URANIUM.name]: 9_000,
      [HYDROGENE.name]: 6_500,
      [FER.name]: 7_500,
    },
  },
  warp4: {
    id: "warp4",
    name: "Warp 4",
    // TODO replace lorem
    description:
      "Un moteur warp plus puissant que le précédent, son nouveau systeme de refroidissement permet de le faire fonctionner plus longtemps, pour un meilleur rendement",
    type: IModuleType.ENGINE,
    img: "/images/modules/engines/DX5.webp",
    emplacement: 6,
    modifier: {
      [IModifier.WARP]: 700,
      [IModifier.CONSO]: 600,
    },
    cost: {
      [TITANE.name]: 2_000,
      [CUIVRE.name]: 20_000,
      [AZOTE.name]: 2_300,
      [URANIUM.name]: 9_000,
      [HYDROGENE.name]: 6_500,
      [FER.name]: 7_500,
    },
  },
  shield1: {
    id: "shield1",
    name: "Shield 1",
    description: "Un bouclier conçu par les meilleurs ingénieurs de la galaxie",
    type: IModuleType.DEFENSE,
    img: "/images/modules/defense/shield1.png",
    emplacement: 2,
    modifier: {
      [IModifier.SHIELD]: 200,
    },
    cost: {
      [URANIUM.name]: 1_000,
      [ALUMINUM.name]: 3_200,
    },
  },
  shield2: {
    id: "shield2",
    name: "Shield 2",
    description:
      "Ducimus est sint animi repudiandae placeat tempore molestiae magnam. Rerum id similique ut non qui quia. Similique est in odit vel sit culpa repellat reprehenderit. Nostrum maxime ad pariatur aut dolores. Officiis quam debitis alias provident magni eum.",
    type: IModuleType.DEFENSE,
    img: "/images/modules/defense/shield2.png",
    emplacement: 4,
    modifier: {
      [IModifier.SHIELD]: 450,
    },
    cost: {
      [URANIUM.name]: 3_000,
      [ALUMINUM.name]: 12_000,
    },
  },
  coque1: {
    id: "coque1",
    name: "Coque 1",
    description: "Quidem aut autem et rerum minus incidunt aut.",
    type: IModuleType.DEFENSE,
    img: "/images/modules/defense/coque1.png",
    emplacement: 1,
    modifier: {
      [IModifier.COQUE]: 80,
    },
    cost: {
      [ALUMINUM.name]: 1_500,
    },
  },
  coque2: {
    id: "coque2",
    name: "Coque 2",
    description: "Quidem aut autem et rerum minus incidunt aut.",
    type: IModuleType.DEFENSE,
    img: "/images/modules/defense/coque2.png",
    emplacement: 2,
    modifier: {
      [IModifier.COQUE]: 200,
    },
    cost: {
      [ALUMINUM.name]: 9_000,
    },
  },
  tissue1: {
    id: "tissue1",
    name: "Tissue énergétique",
    description:
      "Tempora natus soluta hic quia dolor voluptatem pariatur incidunt.",
    type: IModuleType.OTHER,
    img: "/images/modules/other/material.png",
    emplacement: 2,
    modifier: {
      [IModifier.COQUE]: 40,
    },
    cost: {
      [SILICIUM.name]: 2_300,
      [HYDROGENE.name]: 1_000,
    },
  },
  nanofiber: {
    id: "nanofiber",
    name: "Nanofibres",
    description:
      "Des nanoparticules de fibres de carbone qui permettent de renforcer la coque.",
    type: IModuleType.OTHER,
    img: "/images/modules/other/material2.png",
    emplacement: 1,
    modifier: {
      [IModifier.COQUE]: 100,
    },
    cost: {
      [SILICIUM.name]: 5_000,
      [HYDROGENE.name]: 2_000,
      [FER.name]: 1_000,
    },
  },
  laserExtractionAsteroid: {
    id: "laserExtractionAsteroid",
    name: "Laser d'extraction d'astéroïdes",
    description:
      "Un laser qui permet d'extraire des ressources des astéroïdes.",
    type: IModuleType.OTHER,
    img: "/images/modules/other/laser_asteroid_extract.webp",
    emplacement: 1,
    modifier: {
      [IModifier.EXTRACTION_ASTEROID]: 1,
    },
    cost: {
      [SILICIUM.name]: 5_000,
      [HYDROGENE.name]: 2_000,
      [FER.name]: 1_000,
    },
  },
})

/* The `ex` variable is not used in the provided code. It is not declared or referenced anywhere. */
export default {
  getAllModules,
}
