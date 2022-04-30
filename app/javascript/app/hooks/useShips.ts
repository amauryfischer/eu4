import { useSelector } from "react-redux"
import IShip from "type/IShip"

const useShips: () => { [key: string]: IShip } = () => {
  return useSelector((state: any) => state.ships) ?? {}
}
export default useShips
