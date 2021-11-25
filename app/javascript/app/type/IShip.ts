import IModule from "./IModule"

interface IShip {
  name: string
  key: string
  cost: { [name: string]: number }
  img: string
  emplacement: number
  fuelSpace: number
  multiplier: { [name: string]: number }
  baseCoque: number
  modules?: IModule[]
}

export default IShip
