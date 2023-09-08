import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskFlyingFleet } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { CardBody, ModalBody } from "@nextui-org/react"

const TaskFlyingFleet = ({ task }: { task: ITaskFlyingFleet }) => {
	const fleets = useFleets()
	const ships = useShips()
	return (
		<>
			<img
				src={
					ShipService.getAllShips()[
						ships[fleets[task.details.fleetId].shipIds[0]].class
					]?.img
				}
			/>
			<CardBody>
				<Flex alignItems="center" gap="1rem">
					<Spaceship width="36px" />
					Déplacement en cours
				</Flex>
			</CardBody>
		</>
	)
}

export default TaskFlyingFleet
