import useCurrentSendPosition from "@/hooks/current/use-current-send-position"
import useCurrentShip from "@/hooks/current/use-current-ship.hook"
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
import ShipNumberModules from "@/ui/molecules/entity/ship/ShipNumberModules"
import ShipStats from "@/ui/molecules/entity/ship/ShipStats"
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

const ModalShip = () => {
	const dispatch = useDispatch()

	const currentShip = useCurrentShip()
	if (!currentShip) return null
	return (
		<BModal
			size={"5xl"}
			isOpen={!!currentShip}
			onOpenChange={() => {
				dispatch(setCurrentShip(undefined))
			}}
			scrollBehavior="inside"
			title="Selectionnez une flotte"
		>
			<ModalContent>
				<ModalHeader>
					<BAvatar src={ShipService.getAllShips()[currentShip.class].img} />
					Vaisseau : {currentShip?.name}
				</ModalHeader>
				<ModalBody>
					<h3>Modules</h3>
					<ShipStats ship={currentShip} />
					<ShipNumberModules ship={currentShip} />
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentShip(undefined))}
					/>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
}

export default ModalShip
