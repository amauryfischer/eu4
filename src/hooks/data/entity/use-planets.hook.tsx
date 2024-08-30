import useData from "../generic/use-data.hook"
import { IPlanet } from "@/type/data/IPlanet"

const usePlanets = useData("Planet") as () => Record<string, IPlanet>

export default usePlanets
