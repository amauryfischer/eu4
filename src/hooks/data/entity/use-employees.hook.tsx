import { Employee } from "@prisma/client"
import useData from "../generic/use-data.hook"

const useEmployees = useData("Employee") as () => Record<string, Employee>

export default useEmployees
