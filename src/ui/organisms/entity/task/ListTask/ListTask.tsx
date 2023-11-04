import { Task } from "@prisma/client"
import { CardBody, CardFooter } from "@nextui-org/react"
import { List } from "@mui/material"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { TaskContainer } from "./ListTask.styled"
import TaskCard from "../TaskCard/TaskCard"

const ListTask = ({ tasks }: { tasks: Record<string, Task> }) => {
	const { fetchTasks } = useTasksActions()
	return (
		<TaskContainer>
			{Object.values(tasks).map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
		</TaskContainer>
	)
}

export default ListTask
