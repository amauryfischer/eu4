import { Task } from "@prisma/client"
import { CardBody, CardFooter } from "@nextui-org/react"
import { List } from "@mui/material"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { TaskContainer } from "./ListTask.styled"
import TaskCard from "../TaskCard/TaskCard"
import useTasks from "@/hooks/data/entity/use-tasks.hook"

const ListTask = () => {
	const { fetchTasks } = useTasksActions()
	const tasks = useTasks()
	return (
		<TaskContainer>
			{Object.values(tasks).map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
		</TaskContainer>
	)
}

export default ListTask
