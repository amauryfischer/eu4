import React from "react"
import { useDispatch } from "react-redux"
import ModulesService from "@/services/ModulesService"
import moment from "moment"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useCurrentPlanet from "@/hooks/current/use-current-planet.hook"
import ModuleCard from "@/ui/molecules/entity/module/ModuleCard"
import { TaskType } from "@/type/data/ITask"
import Button from "@/ui/atoms/buttons/Button"

const PlanetFabric = () => {
	const dispatch = useDispatch()
	const currentPlanet = useCurrentPlanet()
	const { createTask, fetchTasks } = useTasksActions()
	return (
		<>
			{Object.values(ModulesService.getAllModules()).map((module, index) => {
				return (
					<ModuleCard
						key={module.id}
						module={module}
						actions={
							<Button
								color="cyan500"
								onClick={() => {
									createTask({
										type: TaskType.CONSTRUCT_MODULE,
										endTime: moment().add(3, "minutes").format(),
										details: {
											resources: module.cost,
											planetId: currentPlanet.id,
											module: {
												type: module.id,
												modifier: module.modifier
											}
										}
									})
									fetchTasks()
								}}
							>
								Fabriquer
							</Button>
						}
					/>
				)
			})}
		</>
	)
}

export default PlanetFabric
