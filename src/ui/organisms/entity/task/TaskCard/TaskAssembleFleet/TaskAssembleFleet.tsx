import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAssembleFleet } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Mine from "@/ui/fondations/icons/Mine"
import { CardBody, Image } from "@nextui-org/react"
import { Task } from "@prisma/client"

const TaskAssembleFleet = ({ task }: { task: ITaskAssembleFleet }) => {
	const fleets = useFleets()
	const ships = useShips()
	const currentFleet = fleets[task.details.fleetId]
	return (
		<>
			<Image
				src={
					ShipService.getAllShips()[
						ships[fleets[task.details.fleetId]?.shipIds?.[0]]?.class
					]?.img
				}
				width="100%"
				height={200}
			/>
			<CardBody>
				<Flex alignItems="center" gap="0.5rem" className="text-white">
					<Mine width="36px" />
					Assemblage de la flotte en cours
				</Flex>
			</CardBody>
		</>
	)
}

export default TaskAssembleFleet
