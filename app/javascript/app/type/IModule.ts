export enum IModifier {
  IMPULSION = "impulsion",
  WARP = "warp",
  COQUE = "coque",
  SHIELD = "shield",
  FUEL = "FUEL",
  CARGO = "cargo",
  CONSO = "conso",
}
export enum IDamage {
  LASER = "laser",
  MISSILE = "missile",
  ION = "ion",
}
export interface IModule {
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
