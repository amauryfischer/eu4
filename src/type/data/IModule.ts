export enum IModifier {
  IMPULSION = "impulsion",
  WARP = "warp",
  COQUE = "coque",
  SHIELD = "shield",
  FUEL = "FUEL",
  CARGO = "cargo",
  CONSO = "conso",
  LASER = "laser",
  MISSILE = "missile",
  IEM = "iem",
}
export enum IDamage {
  LASER = "laser",
  MISSILE = "missile",
  ION = "ion",
}
export interface IModule {
  id: string
  name: string
  description: string
  type: string
  img: string
  emplacement: number
  modifier?: {
    [name: string]: number
  }
  weapon?: {
    type: IDamage
    damage: number
    precision: number
  }
  cost: {
    [name: string]: number
  }
}
