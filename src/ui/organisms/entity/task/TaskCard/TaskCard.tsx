import { CardBody, CardFooter, Progress } from "@nextui-org/react"
import { Task } from "@prisma/client"
import { StyledTaskCard } from "./TaskCard.styled"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { useEffect, useState } from "react"
import moment from "moment"
import {
	ITask,
	ITaskAsteroid,
	ITaskFlyingFleet,
	TaskType,
} from "@/type/data/ITask"
import useAsteroidsActions from "@/hooks/data/actions/use-asteroids-actions.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import TaskCollectAsteroid from "./TaskCollectAsteroid.tsx/TaskCollectAsteroid"
import TaskFlyingFleet from "./TaskFlyingFleet/TaskFlyingFleet"
import Mine from "@/ui/fondations/icons/Mine"
import Spaceship from "@/ui/fondations/icons/Spaceship"

const TaskCard = ({ task }: { task: ITask }) => {
	const [progress, setProgress] = useState(0)
	const { fetchTasks } = useTasksActions()
	const { fetchAsteroids } = useAsteroidsActions()
	const { fetchFleets } = useFleetsActions()
	// tick every seconds
	useEffect(() => {
		const interval = setInterval(() => {
			const endDate = moment(task.endDate)
			const createdAt = moment(task.createdAt)
			const current = moment()
			setProgress(
				Math.round((current.diff(createdAt) / endDate.diff(createdAt)) * 100),
			)
			if (current.isAfter(endDate)) {
				if (task.type === TaskType.COLLECT_ASTEROIDS) {
					fetchAsteroids()
					fetchFleets()
				}
				if (task.type === TaskType.FLYING_FLEET) {
					fetchFleets()
				}
				fetchTasks()
			}
		}, 2000)
		return () => clearInterval(interval)
	}, [task])

	if (moment().isAfter(moment(task.endDate))) {
		return null
	}

	const colorAdvancement = (advancement: number) => {
		if (advancement < 33) {
			return "default"
		}
		if (advancement < 66) {
			return "warning"
		}
		return "success"
	}
	return (
		<StyledTaskCard>
			{task.type === TaskType.COLLECT_ASTEROIDS && (
				<TaskFlyingFleet
					task={task as ITaskAsteroid}
					progress={progress}
					icon={<Mine width="24px" />}
					color="caramel300"
				/>
			)}
			{task.type === TaskType.FLYING_FLEET && (
				<TaskFlyingFleet
					task={task as unknown as ITaskFlyingFleet}
					progress={progress}
					icon={<Spaceship width="24px" />}
					color="cyan300"
				/>
			)}
			{/* <div>
				Temps restant: {moment(task.endDate).diff(moment(), "seconds")} secondes
			</div> */}
		</StyledTaskCard>
	)
}

export default TaskCard
