import { Ship } from "@prisma/client"
import { IModule } from "./IModule"

interface IShip extends Omit<Ship,"modules"> {
  modules: Array<IModule>
}

export default IShip
