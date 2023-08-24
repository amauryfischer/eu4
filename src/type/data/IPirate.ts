import { IPosition } from "./IPosition"

interface IPirate {
  id?: string
  data: {
    name: string
    level: number
    position: IPosition
  }
}

export default IPirate
