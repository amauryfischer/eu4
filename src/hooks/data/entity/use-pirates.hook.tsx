import IPirate from "@/type/data/IPirate"
import useData from "../generic/use-data.hook"

const usePirates = useData("Pirate") as () => Record<string, IPirate>
export default usePirates
