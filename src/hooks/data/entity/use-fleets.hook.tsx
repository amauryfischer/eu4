import useData from "../generic/use-data.hook"
import { IFleet } from "@/type/data/IFleet"

const useFleets = useData("Fleet") as () => Record<string, IFleet>
export default useFleets
