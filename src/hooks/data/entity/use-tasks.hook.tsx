import { Task } from "@prisma/client"
import useData from "../generic/use-data.hook"

const useTasks = useData("Task") as () => Record<string, Task>
export default useTasks
