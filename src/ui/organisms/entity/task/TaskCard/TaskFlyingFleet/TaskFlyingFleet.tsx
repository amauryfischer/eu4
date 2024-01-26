import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskAsteroid, ITaskFlyingFleet } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import { CardBody, Image, ModalBody } from "@nextui-org/react"
import styled from "styled-components"
import Moment from "moment"
import {
	RemainingTime,
	SImage,
	SpaceShipContainer,
	StyledProgress,
	TaskContainer,
} from "./TaskFlyingFleet.styled"
import BProgress from "@/ui/molecules/progress/BProgress"
import { cloneElement } from "react"

const TaskFlyingFleet = ({
	task,
	progress,
	icon,
	color,
}: {
	task: ITaskAsteroid | ITaskFlyingFleet
	progress: number
	icon: JSX.Element
	color: string
}) => {
	const fleets = useFleets()
	const ships = useShips()
	const remainingTime = Moment(task.endDate).diff(Moment())
	const readableRemainingTime = Moment.duration(remainingTime).humanize()
	const iconWithColor = cloneElement(icon, { color: color })
	return (
		<TaskContainer $color={color}>
			<SImage
				src={
					ShipService.getAllShips()[
						ships[fleets[task.details.fleetId].shipIds[0]].class
					]?.img
				}
				width={300}
				classNames={{
					wrapper: "!max-w-full",
				}}
			/>
			<SpaceShipContainer>{iconWithColor}</SpaceShipContainer>
			<RemainingTime>{readableRemainingTime}</RemainingTime>
			<StyledProgress
				aria-label="Loading..."
				value={progress}
				className="max-w-md"
			/>

			{/* <CardBody>
				<Flex alignItems="center" gap="1rem">
					<Spaceship width="36px" />
					Déplacement en cours
				</Flex>
			</CardBody> */}
		</TaskContainer>
	)
}

export default TaskFlyingFleet
