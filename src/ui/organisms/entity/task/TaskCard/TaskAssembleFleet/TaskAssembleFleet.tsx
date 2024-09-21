import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAssembleFleet } from "@/type/data/ITask"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
const TaskAssembleFleet = ({
	task,
	progress
}: { task: ITaskAssembleFleet; progress: number }) => {
	const ships = useShips()
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Mine />}
			color="blue"
			imgSrc={
				ShipService.getAllShips()[ships[task.details.shipIds?.[0]]?.class]?.img
			}
		/>
	)
}

export default TaskAssembleFleet
