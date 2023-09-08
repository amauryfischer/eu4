import React from "react"
import { useDispatch } from "react-redux"
import ModulesService from "@/services/ModulesService"
import moment from "moment"
import BButton from "@/ui/atoms/buttons/BButton"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useCurrentPlanet from "@/hooks/current/use-current-planet.hook"
import RUBY_DATE_FORMAT from "@/utils/rubyDateFormat"
import ModuleCard from "@/ui/molecules/entity/module/ModuleCard"
import { TaskType } from "@/type/data/ITask"

const PlanetFabric = ({}) => {
	const dispatch = useDispatch()
	const currentPlanet = useCurrentPlanet()
	const { createTask } = useTasksActions()
	return (
		<>
			{Object.values(ModulesService.getAllModules()).map((module, index) => {
				return (
					<ModuleCard
						key={index}
						module={module}
						actions={
							<BButton
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
												modifier: module.modifier,
											},
										},
									})
								}}
							>
								Fabriquer
							</BButton>
						}
					/>
				)
			})}
		</>
	)
}

export default PlanetFabric
