import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAssembleFleet, ITaskBuildShip } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Mine from "@/ui/fondations/icons/Mine"
import { CardBody, Image } from "@nextui-org/react"
import { Task } from "@prisma/client"

const TaskBuildShip = ({ task }: { task: ITaskBuildShip }) => {
	return (
		<>
			<Image
				src={ShipService.getAllShips()[task.details.class]?.img}
				width="100%"
				height={200}
			/>
			<CardBody>
				<Flex alignItems="center" gap="0.5rem" className="text-white">
					<Mine width="36px" />
					Construction du vaisseau en cours
				</Flex>
			</CardBody>
		</>
	)
}

export default TaskBuildShip
