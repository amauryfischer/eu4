"use client"
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { setCurrentUpgradeBuilding } from "@/redux/slice/current.slice"
import { AppDispatch, RootState } from "@/redux/store"
import BuildingService from "@/services/building/BuildingService"
import { TaskType } from "@/type/data/ITask"
import Button from "@/ui/atoms/buttons/Button"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import BModal from "@/ui/molecules/modal/BModal"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import RenderResources from "../../RenderResources"
import useTasks from "@/hooks/data/entity/use-tasks.hook"

const ModalUpgradeBuilding = () => {
	const dispatch = useDispatch<AppDispatch>()
	const currentPlanet = useCurrentPlayerActivePlanet()
	const { updatePlanet } = usePlanetsActions()
	const { createTask } = useTasksActions()
	const tasks = useTasks()
	const currentUser = useCurrentUser()

	const currentBuilding = useSelector(
		(state: RootState) => state.current.upgradeBuilding
	)
	const upgradeTask = Object.values(tasks).find(
		(t) => t.type === TaskType.UPGRADE_BUILDING
	)
	if (!currentBuilding) return null
	const onUpgrade = () => {
		createTask({
			type: TaskType.UPGRADE_BUILDING,
			endDate: moment().add(1, "hour").toISOString(),
			details: {
				buildingType: currentBuilding,
				planetId: currentPlanet?.id
			},
			userId: currentUser?.id
		})
		dispatch(setCurrentUpgradeBuilding(undefined))
	}
	return (
		<BModal
			size={"5xl"}
			isOpen={!!currentBuilding}
			onOpenChange={() => {
				dispatch(setCurrentUpgradeBuilding(undefined))
			}}
			scrollBehavior="inside"
			title={`Upgrade ${currentBuilding}`}
		>
			<ModalContent>
				<ModalHeader>{currentBuilding}</ModalHeader>
				<ModalBody>
					<RenderResources
						resources={
							BuildingService.getAllBuildings()?.[currentBuilding]?.[
								(currentPlanet?.buildingLevel?.[currentBuilding] ?? 0) + 1
							]?.cost
						}
					/>
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentUpgradeBuilding(undefined))}
					/>
					<Button
						variant="bordered"
						color="cyan"
						onClick={onUpgrade}
						isDisabled={!!upgradeTask}
					>
						Upgrade {currentBuilding} to level{" "}
						{currentPlanet?.buildingLevel?.[currentBuilding] + 1}
					</Button>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
}

export default ModalUpgradeBuilding
