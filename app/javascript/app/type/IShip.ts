import { IModule } from "./IModule"

interface IShip {
  name: string
  class: string
  modules?: IModule[]
}

export default IShip
