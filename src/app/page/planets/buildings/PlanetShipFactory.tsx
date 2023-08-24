import React from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import ShipService from "@/services/ShipService"
import styled from "styled-components"
import Defer from "@/utils/Defer"
import ShipCard from "@/ui/molecules/entity/ship/ShipCard"
import { Tab, Tabs } from "@nextui-org/react"

const ShipContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem;
`
const PlanetShipFactory = ({}) => {
	const ships = ShipService.getAllShips()
	const { id } = useParams()
	const navigate = useNavigate()
	return (
		<>
			<Tabs>
				<Tab key="Vaisseaux">
					<ShipContainer>
						<Defer>
							{Object.values(ships).map((ship) => {
								return (
									<ShipCard
										key={ship.class}
										ship={ship}
										onClick={() =>
											navigate(`/planets/${id}/shipfactory/build/${ship.class}`)
										}
									/>
								)
							})}
						</Defer>
					</ShipContainer>
				</Tab>
				<Tab key="Stations">
					<></>
				</Tab>
				<Tab key="Défenses">
					<></>
				</Tab>
			</Tabs>
		</>
	)
}

export default PlanetShipFactory
