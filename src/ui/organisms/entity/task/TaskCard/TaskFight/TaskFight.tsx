import { ITaskUpgradeResource } from "@/type/data/ITask"
import Moment from "moment"

import ResearchService from "@/services/research/ResearchService"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
import Attack from "@/ui/fondations/icons/Attack"
import ModalFight from "@/ui/organisms/Modals/specific/ModalFight"
import { useState } from "react"
import { setCurrentCombatTask } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"

const TaskFight = ({
	task,
	progress
}: {
	task: ITaskUpgradeResource
	progress: number
}) => {
	const dispatch = useDispatch()

	return (
		<>
			<TaskCardBasic
				task={task}
				progress={progress}
				icon={<Attack />}
				onClick={() => dispatch(setCurrentCombatTask(task))}
				color="purple"
				imgSrc={"/images/other/fight.webp"}
			/>
		</>
	)
}

export default TaskFight
