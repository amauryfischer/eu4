"use client";
import useCurrentSendPosition from "@/hooks/current/use-current-send-position";
import useCurrentUser from "@/hooks/current/use-current-user.hook";
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook";
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook";
import useFleets from "@/hooks/data/entity/use-fleets.hook";
import useShips from "@/hooks/data/entity/use-ships.hook";
import useTasks from "@/hooks/data/entity/use-tasks.hook";
import {
	setCurrentFleet,
	setCurrentSendPosition,
	setCurrentShip,
} from "@/redux/slice/current.slice";
import ShipService from "@/services/ShipService";
import { TaskType } from "@/type/data/ITask";
import Flex from "@/ui/atoms/Flex/Flex";
import BAvatar from "@/ui/atoms/avatar/BAvatar";
import BButton from "@/ui/atoms/buttons/Button";
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import Spaceship from "@/ui/fondations/icons/Spaceship";
import BModal from "@/ui/molecules/modal/BModal";
import {
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react"
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FuelBar from "../../entity/fleet/FuelBar"
import FleetService from "@/services/FleetService"
import ListFleet from "../../entity/fleet/ListFleet"

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 100px 140px 300px 100px;
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
					<ListFleet
						fleets={Object.values(fleets)}
						additionalRows={[
							(fleet) => {
								const isFlying = Object.values(tasks).some(
									(task) =>
										task.type === TaskType.FLYING_FLEET &&
										task.details?.fleetId === fleet.id &&
										!moment().isAfter(moment(task.endDate))
								)
								return (
									<>
										{isFlying && (
											<Flex gap="1rem" alignItems="center">
												<Spaceship /> <div>Voyage en cours</div>
											</Flex>
										)}
										{!isFlying && (
											<SendFleetButton
												isDisabled={
													fleet.position.system ===
														currentSendPosition?.system &&
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
																	z: currentSendPosition.systemPosition.z
																}
															},
															fleetId: fleet.id
														},
														userId: user.id
													})
													fetchTasks()
												}}
												title="Envoyer"
											/>
										)}
									</>
								)
							}
						]}
					/>
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentSendPosition(undefined))}
					/>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
};

export default ModalSendPosition;
