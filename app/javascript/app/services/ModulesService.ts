import IModule, { IModifier } from "../type/IModule"
import {
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
    description: "Cargo S",
    img: "",
    type: IModuleType.CARGO,
    emplacement: 5,
    modifier: {
      [IModifier.CARGO]: 10_000,
      [IModifier.FUEL]: 100,
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
    description: "Cargo M",
    img: "",
    type: IModuleType.CARGO,
    emplacement: 10,
    modifier: {
      [IModifier.CARGO]: 25_000,
      [IModifier.FUEL]: 200,
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
    description: "GPS 1",
    type: IModuleType.ENGINE,
    img: "",
    emplacement: 1,
    modifier: {
      [IModifier.IMPULSION]: 50,
      [IModifier.FUEL]: 10,
    },
    cost: {
      [TITANE.name]: 1_000,
      [CUIVRE.name]: 1_200,
      [AZOTE.name]: 2_00,
      [URANIUM.name]: 4_400,
      [HYDROGENE.name]: 1_300,
    },
  },

  gps2: {
    name: "GPS 2",
    description: "GPS 2",
    type: IModuleType.ENGINE,
    img: "",
    emplacement: 2,
    modifier: {
      [IModifier.IMPULSION]: 120,
      [IModifier.FUEL]: 22,
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
    description: "Warp 1",
    type: IModuleType.ENGINE,
    img: "",
    emplacement: 3,
    modifier: {
      [IModifier.WRAP]: 100,
      [IModifier.FUEL]: 100,
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
    description: "Warp 2",
    type: IModuleType.ENGINE,
    img: "",
    emplacement: 6,
    modifier: {
      [IModifier.WRAP]: 200,
      [IModifier.FUEL]: 190,
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
})

export default {
  getAllModules,
}
