export enum IModifier {
  IMPULSION = "impulsion",
  WRAP = "wrap",
  EMPLACEMENT = "emplacement",
  COQUE = "coque",
  SHIELD = "shield",
  FUEL = "FUEL",
  CARGO = "cargo",
}
export enum IDamage {
  LASER = "laser",
  MISSILE = "missile",
  ION = "ion",
}
interface IModule {
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
export default IModule
