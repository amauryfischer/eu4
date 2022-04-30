import { IModifier, IModule } from "../type/IModule"
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
    name: "Cargo S",
    description:
      // TODO replace lorem
      "description Et voluptatem numquam. Molestias tenetur asperiores. Repellat quidem et aut ducimus a quasi. Reprehenderit quis quis.",
    img: "",
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
    name: "Cargo M",
    // TODO replace lorem
    description:
      "Cargo M description Nihil ut fugit et mollitia consequatur aspernatur nam quia eos. Vitae vero temporibus sed sed voluptatem dolorem. Sed perferendis reprehenderit ullam cupiditate dolorem labore ut. Aliquid numquam dolorem sed doloribus aperiam exercitationem ipsum. Ducimus dolor dolore ea ut architecto dolor modi.",
    img: "",
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
  gps1: {
    name: "GPS 1",
    // TODO replace lorem
    description:
      "GPS 1 Doloribus ut laboriosam ab. Aut aperiam adipisci. Sit quos nobis quibusdam consectetur veritatis et dolor unde.",
    type: IModuleType.ENGINE,
    img: "",
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
    name: "GPS 2",
    // TODO replace lorem
    description:
      "GPS 2 Voluptatem veritatis corrupti nisi similique necessitatibus voluptate ducimus dolores culpa. Quas cumque voluptatem voluptatem. Quia libero optio quibusdam magnam porro qui sit doloremque id. Sint sunt accusantium atque. Facere maiores expedita vel assumenda minus odio et fuga unde.",
    type: IModuleType.ENGINE,
    img: "",
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
    name: "Warp 1",
    // TODO replace lorem
    description:
      "Warp 1 Qui eligendi et dolore ratione laudantium. Sit fugiat voluptatibus possimus reprehenderit velit omnis. Est voluptas maiores quo dolor dolorem.",
    type: IModuleType.ENGINE,
    img: "",
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
    name: "Warp 2",
    // TODO replace lorem
    description:
      "Warp 2 Autem dolorem odit ipsum dolorem cumque. Ab corporis aliquam omnis autem laudantium est ex. Dolor nihil facere est excepturi dolores id et sapiente.",
    type: IModuleType.ENGINE,
    img: "",
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
  shield1: {
    name: "Shield 1",
    description: "Provident molestiae occaecati rem quos provident animi.",
    type: IModuleType.DEFENSE,
    img: "",
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
    name: "Shield 2",
    description:
      "Ducimus est sint animi repudiandae placeat tempore molestiae magnam. Rerum id similique ut non qui quia. Similique est in odit vel sit culpa repellat reprehenderit. Nostrum maxime ad pariatur aut dolores. Officiis quam debitis alias provident magni eum.",
    type: IModuleType.DEFENSE,
    img: "",
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
    name: "Coque 1",
    description: "Quidem aut autem et rerum minus incidunt aut.",
    type: IModuleType.DEFENSE,
    img: "",
    emplacement: 1,
    modifier: {
      [IModifier.COQUE]: 80,
    },
    cost: {
      [ALUMINUM.name]: 1_500,
    },
  },
  coque2: {
    name: "Coque 2",
    description: "Quidem aut autem et rerum minus incidunt aut.",
    type: IModuleType.DEFENSE,
    img: "",
    emplacement: 2,
    modifier: {
      [IModifier.COQUE]: 200,
    },
    cost: {
      [ALUMINUM.name]: 9_000,
    },
  },
})

export default {
  getAllModules,
}
