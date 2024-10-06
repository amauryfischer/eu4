import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import ShipService from "@/services/ShipService"
import { IFleet } from "@/type/data/IFleet"
import IShip from "@/type/data/IShip"
import { ITask } from "@/type/data/ITask"
import Button from "@/ui/atoms/buttons/Button"
import Flex from "@/ui/atoms/Flex"
import { Checkbox } from "@mui/material"
import { Input } from "@nextui-org/react"
import { TaskType } from "@prisma/client"
import moment from "moment"
import { useState } from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"

const StyledCheckbox = styled(Checkbox)`
  color: var(--primary) !important;
`
const ClickableShipContainer = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    background-color: hsla(var(--primary-hue), 100%, 90%, 0.1);
  }
`

const YellowText = styled.span`
  color: var(--primary) !important;
`

const PlanetSpatioport = () => {
	// * state
	const [selectedShips, setSelectedShips] = useState<string[]>([])
	const [fleetName, setFleetName] = useState("")

	// * selector
	const ships = useShips()
	const planet = useCurrentPlayerActivePlanet()
	const { createTask, fetchTasks } = useTasksActions()
	const { fetchFleets } = useFleetsActions()
	const tasks = useTasks()
	const user = useCurrentUser()
	const fleets = useFleets()

	const onToggleShip = (shipId: string) => {
		if (selectedShips.includes(shipId)) {
			setSelectedShips(
				selectedShips.filter((shipIdToFilter) => shipIdToFilter !== shipId)
			)
			return
		}
		setSelectedShips([...selectedShips, shipId])
	}

	const onCreateFleet = () => {
		createTask({
			type: TaskType.ASSEMBLE_FLEET,
			endDate: moment().add(3, "minutes").format(),
			userId: user.id,
			details: {
				shipIds: selectedShips,
				planetId: planet.id,
				name: fleetName,
				fleetId: uuidv4()
			}
		})

		setFleetName("")
		setSelectedShips([])
		fetchTasks()
		fetchFleets()
	}

	const shipClasses = ShipService.getAllShips()
	const ownerShips = Object.values(ships).filter(
		(ship: IShip) => ship.userId === user.id && ship.planetId === planet.id
	)

	return (
		<Flex direction="column" gap="2rem">
			<Flex fullWidth>
				<Flex gap="0.5rem" alignItems="center">
					<Input
						label="nom de la flotte"
						placeholder="nom de la flotte"
						value={fleetName}
						onChange={(e) => setFleetName(e.target.value)}
						variant="bordered"
					/>
					<Button variant="bordered" color="primary" onPress={onCreateFleet}>
						Créer une flotte
					</Button>
				</Flex>
			</Flex>
			{ownerShips.map((ship: IShip) => {
				if (
					Object.values(fleets).some((fleet: IFleet) =>
						fleet?.shipIds?.includes(ship.id)
					)
				) {
					return null
				}
				if (
					Object.values(tasks).filter(
						(task: ITask) =>
							task.type === TaskType.ASSEMBLE_FLEET &&
							task.details.shipIds.includes(ship.id)
					).length > 0
				) {
					return null
				}
				const chassis = shipClasses[ship.class]
				return (
					<ClickableShipContainer
						key={ship.id}
						onClick={() => {
							onToggleShip(ship.id)
						}}
					>
						<Flex gap="0.5rem">
							<StyledCheckbox checked={selectedShips.includes(ship.id)} />
							<img src={chassis.img} width={80} alt={ship.name} />
							<YellowText>
								{ship.name} ({chassis.name})
							</YellowText>
						</Flex>
					</ClickableShipContainer>
				)
			})}
		</Flex>
	)
}

export default PlanetSpatioport
