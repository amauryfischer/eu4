import { Task } from "@prisma/client"
import useData from "../generic/use-data.hook"
import { ITask } from "@/type/data/ITask"

const useTasks = useData("Task") as () => Record<string, ITask>
export default useTasks
