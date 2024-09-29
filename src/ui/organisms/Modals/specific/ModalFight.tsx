"use client"
import useCurrentPirate from "@/hooks/current/use-current-pirate.hook"
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import {
	setCurrentPirate,
	setCurrentSendPosition
} from "@/redux/slice/current.slice"
import { IFleet } from "@/type/data/IFleet"
import { ITaskFight, TaskType } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex"
import AttackButton from "@/ui/atoms/buttons/AttackButton"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"
import BModal from "@/ui/molecules/modal/BModal"
import ListFleet from "@/ui/organisms/entity/fleet/ListFleet"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spacer
} from "@nextui-org/react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import ListFleetCombat from "../../entity/fleet/ListFleet/ListFleetCombat"
import usePiratesOnPosition from "@/hooks/data/entity/use-pirates-on-position.hook"
import IPirate from "@/type/data/IPirate"

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`

const ModalFight = () => {
	const dispatch = useDispatch()
	const pirate = useCurrentPirate()
	const tasks = useTasks()
	const allFleets = useFleets()
	if (!pirate) {
		return null
	}
	const combatTask = Object.values(tasks).find(
		(task) =>
			task.type === TaskType.FIGHT &&
			Object.values(allFleets).some((fleet) =>
				task.details?.fleetIds?.includes(fleet.id)
			)
	) as ITaskFight
	const fleetsPosition = useFleetsOnPosition(combatTask?.details?.position)
	const piratesPosition = usePiratesOnPosition(combatTask?.details?.position)
	return (
		<>
			<BModal
				size="5xl"
				isOpen={!!pirate}
				onOpenChange={() => dispatch(setCurrentPirate(undefined))}
			>
				<ModalContent>
					<ModalHeader>{"Combat"}</ModalHeader>
					<ModalBody>
						<Flex direction="column" alignItems="start" fullWidth>
							<Flex>
								<ListFleetCombat fleets={fleetsPosition} />
								<ListFleetCombat fleets={piratesPosition as IFleet[]} />
							</Flex>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<CloseElementButton
							onClick={() => {
								dispatch(setCurrentPirate(undefined))
							}}
						/>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	)
}

export default ModalFight
