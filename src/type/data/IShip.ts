import { Ship } from "@prisma/client"
import { IModule } from "./IModule"

interface IShip extends Omit<Ship,"modules"> {
  modules: IModule[]
}

export default IShip
