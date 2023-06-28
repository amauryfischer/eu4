import { Charge } from "@prisma/client"
import useData from "../generic/use-data.hook"

const useCharges = useData("Charge") as Record<string, Charge>

export default useCharges
