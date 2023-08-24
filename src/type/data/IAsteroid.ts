import { RESOURCE_TYPES } from "services/ResourcesService"
import { IPosition } from "./IPosition"

interface IAsteroid {
  id?: string
  data: {
    name: string
    position: IPosition
    resources: {
      [key in RESOURCE_TYPES]: number
    }
  }
}

export default IAsteroid
