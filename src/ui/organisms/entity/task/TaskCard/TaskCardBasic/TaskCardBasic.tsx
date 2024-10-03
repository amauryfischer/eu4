import { SpaceShipContainer } from "../TaskFlyingFleet/TaskFlyingFleet.styled"
import {
	RemainingTime,
	SImage,
	StyledProgress,
	TaskContainer
} from "./TaskCardBasic.styled"
import Moment from "moment"
import { Task } from "@prisma/client"
import React from "react"
const TaskCardBasic = ({
	color,
	imgSrc,
	icon,
	task,
	progress,
	onClick
}: {
	color: string
	imgSrc: string
	icon: JSX.Element
	task: Task
	progress: number
	onClick: () => void
}) => {
	const remainingTime = Moment(task.endDate).diff(Moment())
	const readableRemainingTime = Moment.duration(remainingTime).humanize()
	return (
		<TaskContainer $color={color} onClick={onClick}>
			<SImage
				src={imgSrc}
				width={300}
				classNames={{
					wrapper: "max-w-full",
					img: "max-w-full"
				}}
			/>
			<SpaceShipContainer>
				{React.cloneElement(icon, { width: "24px" })}
			</SpaceShipContainer>
			<RemainingTime>{readableRemainingTime}</RemainingTime>
			<StyledProgress
				aria-label="Loading..."
				value={progress}
				className="max-w-md"
			/>
		</TaskContainer>
	)
}

export default TaskCardBasic
