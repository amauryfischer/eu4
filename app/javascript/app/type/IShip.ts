import { IModule } from "./IModule"

interface IShip {
  id?: string
  data: {
    name: string
    class: string
    modules?: IModule[]
  }
}

export default IShip
