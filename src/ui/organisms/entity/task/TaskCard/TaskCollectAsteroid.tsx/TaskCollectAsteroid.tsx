import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAsteroid } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Mine from "@/ui/fondations/icons/Mine"
import { CardBody, Image } from "@nextui-org/react"
import { Task } from "@prisma/client"

const TaskCollectAsteroid = ({ task }: { task: ITaskAsteroid }) => {
	const fleets = useFleets()
	const ships = useShips()
	return (
		<>
			<Image
				src={
					ShipService.getAllShips()[
						ships[fleets[task.details.fleetId].shipIds[0]].class
					]?.img
				}
				width="100%"
				height={200}
			/>
			<CardBody>
				<Flex alignItems="center" gap="0.5rem">
					<Mine width="36px" />
					Minage d’astéroïde en cours
				</Flex>
			</CardBody>
		</>
	)
}

export default TaskCollectAsteroid
