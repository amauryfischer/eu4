import { IPosition } from "./IPosition"

export interface IFleet {
  name: string
  id: string
  ships: string[]
  position: IPosition
}
