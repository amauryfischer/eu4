import useCurrentUser from "@/hooks/current/use-current-user.hook"
import ShipService from "@/services/ShipService"
import IShipDesign from "@/type/data/IShipDesign"
import ShipCard from "@/ui/molecules/entity/ship/ShipCard"
import { Tab, Tabs } from "@nextui-org/react"
import styled from "styled-components"

const ShipContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 100%;
`
const PlanetShipFactory = ({
	onSelectShip
}: {
	onSelectShip: (ship: IShipDesign) => void
}) => {
	const user = useCurrentUser()
	const ships = ShipService.getAllShips()
	// filtered ships
	const filteredShips = Object.values(ships).filter((ship) => {
		const requiredSearch = ship?.requiredResearch ?? []
		return requiredSearch.every((searchId) => user.research.includes(searchId))
	})
	return (
		<>
			<Tabs color="primary">
				<Tab key="A" title="classType A">
					<ShipContainer>
						{Object.values(filteredShips)
							.filter((ship) => ship.classType === "A")
							.map((ship) => {
								return (
									<ShipCard
										key={ship.class}
										ship={ship}
										onClick={() => {
											onSelectShip(ship)
										}}
									/>
								)
							})}
					</ShipContainer>
				</Tab>
				<Tab key="B" title="classType B">
					<ShipContainer>
						{Object.values(filteredShips)
							.filter((ship) => ship.classType === "B")
							.map((ship) => {
								return (
									<ShipCard
										key={ship.class}
										ship={ship}
										onClick={() => {
											onSelectShip(ship)
										}}
									/>
								)
							})}
					</ShipContainer>
				</Tab>
				<Tab key="C" title="classType C">
					<ShipContainer>
						{Object.values(filteredShips)
							.filter((ship) => ship.classType === "C")
							.map((ship) => {
								return (
									<ShipCard
										key={ship.class}
										ship={ship}
										onClick={() => {
											onSelectShip(ship)
										}}
									/>
								)
							})}
					</ShipContainer>
				</Tab>
				<Tab key="D" title="classType D">
					<ShipContainer>
						{Object.values(filteredShips)
							.filter((ship) => ship.classType === "D")
							.map((ship) => {
								return (
									<ShipCard
										key={ship.class}
										ship={ship}
										onClick={() => {
											onSelectShip(ship)
										}}
									/>
								)
							})}
					</ShipContainer>
				</Tab>
				<Tab key="station" title="Station">
					<ShipContainer>
						{Object.values(filteredShips)
							.filter((ship) => ship.classType === "station")
							.map((ship) => {
								return (
									<ShipCard
										key={ship.class}
										ship={ship}
										onClick={() => {
											onSelectShip(ship)
										}}
									/>
								)
							})}
					</ShipContainer>
				</Tab>
			</Tabs>
		</>
	)
}

export default PlanetShipFactory
