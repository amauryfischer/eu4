import { IPosition } from "./IPosition"

export interface IPlanet {
  name: string
  id: string
  position: IPosition
  owner: string
  population: number
  infrastructure: number
}
