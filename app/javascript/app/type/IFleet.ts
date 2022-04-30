import { IPosition } from "./IPosition"

export interface IFleet {
  id?: string
  data: {
    name: string
    shipIds: string[]
    position: IPosition
  }
}
