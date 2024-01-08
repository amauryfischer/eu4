import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskFlyingFleet } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { CardBody, Image, ModalBody } from "@nextui-org/react"
import styled from "styled-components"
const SImage = styled(Image)`
	width: 100%;
	height: 200px;
	object-fit: cover;
	max-width: 100% !important;
	& > div {
		max-width: 100% !important;
	}
`
const TaskFlyingFleet = ({ task }: { task: ITaskFlyingFleet }) => {
	const fleets = useFleets()
	const ships = useShips()
	return (
		<>
			<SImage
				src={
					ShipService.getAllShips()[
						ships[fleets[task.details.fleetId].shipIds[0]].class
					]?.img
				}
				isBlurred
				width={300}
				classNames={{
					wrapper: "!max-w-full",
				}}
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
