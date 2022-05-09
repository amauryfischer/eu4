import { IPosition } from "./IPosition"

export interface IPlanet {
  data: {
    name: string
    id: string
    position: IPosition
    owner: string
    population: number
    infrastructure: number
  }
  id: string
}
