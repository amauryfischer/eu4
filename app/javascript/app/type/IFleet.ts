import { IPosition } from "./IPosition"

export interface IFleet {
  name: string
  id: string
  shipIds: string[]
  position: IPosition
}
