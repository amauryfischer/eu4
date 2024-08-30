import IShip from "@/type/data/IShip"
import useData from "../generic/use-data.hook"

const useShips = useData("Ship") as () => Record<string, IShip>

export default useShips
