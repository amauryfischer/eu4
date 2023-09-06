import { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IPosition } from "./IPosition"

interface IAsteroid {
  id?: string
  name: string
  position: IPosition
  resources: Record<RESOURCE_TYPES, number>
}

export default IAsteroid
