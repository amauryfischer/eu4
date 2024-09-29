"use client"
import useCurrentPlanet from "@/hooks/current/use-current-planet.hook"
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useCurrentSendPosition from "@/hooks/current/use-current-send-position"
import useCurrentShip from "@/hooks/current/use-current-ship.hook"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import {
	setCurrentFleet,
	setCurrentSendPosition,
	setCurrentShip,
	setCurrentUpgradeBuilding
} from "@/redux/slice/current.slice"
import { AppDispatch, RootState } from "@/redux/store"
import ShipService from "@/services/ShipService"
import BuildingService from "@/services/building/BuildingService"
import { TaskType } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex/Flex"
import BAvatar from "@/ui/atoms/avatar/BAvatar"
import BButton from "@/ui/atoms/buttons/Button"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import ShipNumberModules from "@/ui/molecules/entity/ship/ShipNumberModules"
import ShipStats from "@/ui/molecules/entity/ship/ShipStats"
import BModal from "@/ui/molecules/modal/BModal"
import { Dialog } from "@mui/material"
import {
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react"
import moment from "moment"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

const ModalUpgradeBuilding = () => {
	const dispatch = useDispatch<AppDispatch>()
	const currentPlanet = useCurrentPlayerActivePlanet()
	const { updatePlanet } = usePlanetsActions()
	const { createTask } = useTasksActions()

	const currentBuilding = useSelector(
		(state: RootState) => state.current.upgradeBuilding
	)
	if (!currentBuilding) return null
	const onUpgrade = () => {
		createTask({
			type: TaskType.UPGRADE_BUILDING,
			endDate: moment().add(1, "hour").toISOString(),
			details: {
				buildingType: currentBuilding
			}
		})
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
				<ModalHeader>
					<Image
						height={200}
						src={ShipService.getAllShips()[currentShip.class].img}
					/>
					Vaisseau : {currentShip?.name}
				</ModalHeader>
				<ModalBody>
					<h3>Modules</h3>
					<ShipStats ship={currentShip} />
					<ShipNumberModules ship={currentShip} />
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentUpgradeBuilding(undefined))}
					/>
				</ModalFooter>
				<ModalFooter>
					<BButton onClick={onUpgrade}>Upgrade</BButton>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
}

export default ModalUpgradeBuilding
