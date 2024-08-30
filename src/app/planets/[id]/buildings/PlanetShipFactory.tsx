import ShipService from "@/services/ShipService"
import IShipDesign from "@/type/data/IShipDesign"
import ShipCard from "@/ui/molecules/entity/ship/ShipCard"
import { Tab, Tabs } from "@nextui-org/react"
import styled from "styled-components"

const ShipContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 1rem;
`
const PlanetShipFactory = ({
	onSelectShip,
}: {
	onSelectShip: (ship: IShipDesign) => void
}) => {
	const ships = ShipService.getAllShips()
	return (
		<>
			<Tabs>
				<Tab key="A" title="classType A">
					<ShipContainer>
						{Object.values(ships)
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
					{Object.values(ships)
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
				</Tab>
				<Tab key="C" title="classType C">
					{Object.values(ships)
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
				</Tab>
				<Tab key="D" title="classType D">
					{Object.values(ships)
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
				</Tab>
				<Tab key="station" title="Station">
					{Object.values(ships)
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
				</Tab>
			</Tabs>
		</>
	)
}

export default PlanetShipFactory
