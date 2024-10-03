"use client"
import useCurrentPirate from "@/hooks/current/use-current-pirate.hook"
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import {
	setCurrentCombatTask,
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
	Avatar,
	Chip,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spacer
} from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ListFleetCombat from "../../entity/fleet/ListFleet/ListFleetCombat"
import usePiratesOnPosition from "@/hooks/data/entity/use-pirates-on-position.hook"
import IPirate from "@/type/data/IPirate"
import usePirates from "@/hooks/data/entity/use-pirates.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { RootState } from "@/redux/store"
import { v4 as uuidv4 } from "uuid"

const LogContainer = styled.div`
	max-height: 70vh;
	overflow-y: auto;
	background-color: var(--grey800);
	padding: 1rem;
	border-radius: 1rem;
	flex-grow: 2;
	width: 100%;
`
const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`

const ModalFight = () => {
	const dispatch = useDispatch()
	const pirate = useCurrentPirate()
	const tasks = useTasks()
	const allPirates = usePirates()
	const allShips = useShips()
	const allFleets = useFleets()
	const [shipDetails, setShipDetails] = useState<{
		[key: string]: { name: string; image: string }
	}>({})
	const currentCombatTask = useSelector(
		(state: RootState) => state.current.currentCombatTask
	)

	const combatTask = Object.values(tasks).find(
		(task) =>
			task.type === TaskType.FIGHT &&
			Object.values(allFleets).some((fleet) =>
				task.details?.fleetIds?.includes(fleet.id)
			)
	) as ITaskFight

	const fleetsPosition = useFleetsOnPosition(combatTask?.details?.position)
	const piratesPosition = usePiratesOnPosition(combatTask?.details?.position)
	const logContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (logContainerRef.current) {
			logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
		}
	}, [combatTask?.details?.log])

	useEffect(() => {
		const fetchShipDetails = async () => {
			const shipIds = (combatTask?.details?.log ?? []).flatMap(
				(log) => log.match(/(\b[a-f0-9]{24}\b)/g) || []
			)
			const uniqueShipIds = [...new Set(shipIds)]
			const details = await Promise.all(
				uniqueShipIds.map(async (id) => {
					const ship = (await db.ship.findUnique({ where: { id } })) as IShip
					return { id, name: ship.name, image: ship.image }
				})
			)
			const detailsMap = details.reduce((acc, { id, name, image }) => {
				acc[id] = { name, image }
				return acc
			}, {})
			setShipDetails(detailsMap)
		}
		fetchShipDetails()
	}, [combatTask?.details?.log])

	const renderLog = (log: string) => {
		return log
			.split(
				/(\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b)/g
			)
			.map((part, index) => {
				if (allShips[part]) {
					// const isUserShip = allShips[part].fleetId
					if (allShips[part]) {
						return (
							<Chip
								color="primary"
								variant="bordered"
								key={part}
								avatar={
									<Avatar
										src={ShipService.getAllShips()[allShips[part].class].img}
									/>
								}
							>
								{allShips[part].name}
							</Chip>
						)
					}
				}
				return part
			})
	}

	return (
		<>
			<BModal
				size="5xl"
				isOpen={!!currentCombatTask}
				onOpenChange={() => dispatch(setCurrentCombatTask(undefined))}
			>
				<ModalContent>
					<ModalHeader>{"Combat"}</ModalHeader>
					<ModalBody>
						<Flex alignItems="start" justifyContent="space-between" fullWidth>
							{[...fleetsPosition, ...piratesPosition].map((fleet) => (
								<ListFleetCombat key={fleet.id} fleet={fleet} />
							))}
							<LogContainer ref={logContainerRef}>
								{(combatTask?.details?.log ?? []).map((log) => (
									<div key={uuidv4()}>{renderLog(log)}</div>
								))}
							</LogContainer>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<CloseElementButton
							onClick={() => {
								dispatch(setCurrentCombatTask(undefined))
							}}
						/>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	)
}

export default ModalFight
