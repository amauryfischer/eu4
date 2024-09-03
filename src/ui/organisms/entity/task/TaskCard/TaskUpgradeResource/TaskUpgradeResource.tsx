import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import { ITaskUpgradeResource } from "@/type/data/ITask"
import Moment from "moment"

import { cloneElement } from "react"
import {
	RemainingTime,
	SImage,
	SpaceShipContainer,
	StyledProgress,
	TaskContainer
} from "../TaskFlyingFleet/TaskFlyingFleet.styled"
import ResourcesService from "@/services/ResourcesService"

const TaskUpgradeResource = ({
	task,
	progress,
	icon,
	color
}: {
	task: ITaskUpgradeResource
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
				src={ResourcesService.getAllResources()[task.details.resource].img}
				width={300}
				classNames={{
					wrapper: "!max-w-full"
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

export default TaskUpgradeResource
