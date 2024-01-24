import useCurrentSendPosition from "@/hooks/current/use-current-send-position"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import {
	setCurrentFleet,
	setCurrentSendPosition,
	setCurrentShip,
} from "@/redux/slice/current.slice"
import ShipService from "@/services/ShipService"
import { TaskType } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import BAvatar from "@/ui/atoms/avatar/BAvatar"
import BButton from "@/ui/atoms/buttons/BButton"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import BModal from "@/ui/molecules/modal/BModal"
import { Dialog } from "@mui/material"
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react"
import moment from "moment"
import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 100px 140px 250px;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const ModalSendPosition = () => {
	const fleets = useFleets()
	const ships = useShips()
	const currentSendPosition = useCurrentSendPosition()
	const dispatch = useDispatch()
	const { updateFleet } = useFleetsActions()
	const { fetchTasks, createTask } = useTasksActions()
	const tasks = useTasks()
	const user = useCurrentUser()
	return (
		<BModal
			size={"5xl"}
			isOpen={!!currentSendPosition}
			onOpenChange={() => {
				dispatch(setCurrentSendPosition(undefined))
			}}
			scrollBehavior="inside"
			title="Selectionnez une flotte"
		>
			<ModalContent>
				<ModalHeader>Selectionnez une flotte</ModalHeader>
				<ModalBody>
					<GridContainer>
						{(Object.values(fleets) ?? []).map((fleet) => {
							const shipId = fleet.shipIds[0]
							const isFlying = Object.values(tasks).some(
								(task) =>
									task.type === TaskType.FLYING_FLEET &&
									task.details?.fleetId === fleet.id &&
									!moment().isAfter(moment(task.endDate)),
							)
							return (
								<React.Fragment key={fleet.id}>
									<BAvatar
										src={ShipService.getAllShips()[ships?.[shipId]?.class]?.img}
										className="w-32 h-32"
										radius="lg"
										onClick={() => {
											dispatch(setCurrentFleet(fleet.id))
										}}
									/>
									<div>{fleet.name}</div>
									<div>
										{fleet.position.system}
										{":"}
										{fleet.position.systemPosition.x}
										{":"}
										{fleet.position.systemPosition.y}
										{":"}
										{fleet.position.systemPosition.z}
									</div>
									{isFlying && (
										<Flex gap="1rem" alignItems="center">
											<Spaceship /> <div>Voyage en cours</div>
										</Flex>
									)}
									{!isFlying && (
										<SendFleetButton
											isDisabled={
												fleet.position.system === currentSendPosition?.system &&
												fleet.position.systemPosition.x ===
													currentSendPosition?.systemPosition.x &&
												fleet.position.systemPosition.y ===
													currentSendPosition?.systemPosition.y &&
												fleet.position.systemPosition.z ===
													currentSendPosition?.systemPosition.z
											}
											onClick={() => {
												createTask({
													type: TaskType.FLYING_FLEET,
													endDate: moment().add(10, "seconds").format(),
													details: {
														position: {
															system: currentSendPosition.system,
															systemPosition: {
																x: currentSendPosition.systemPosition.x,
																y: currentSendPosition.systemPosition.y,
																z: currentSendPosition.systemPosition.z,
															},
														},
														fleetId: fleet.id,
													},
													userId: user.id,
												})
												fetchTasks()
											}}
											title="Envoyer"
										/>
									)}
								</React.Fragment>
							)
						})}
					</GridContainer>
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentSendPosition(undefined))}
					/>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
}

export default ModalSendPosition
