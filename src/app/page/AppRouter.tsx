import Flex from "@/ui/atoms/Flex/Flex"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import DesignSystem from "./designSystem/DesignSystem"
import Fleet from "./fleets/Fleet"
import FleetManager from "./fleets/FleetManager"
import PlanetMain from "./planets/PlanetMain"
import PlanetCaserne from "./planets/buildings/PlanetCaserne"
import PlanetFabric from "./planets/buildings/PlanetFabric"
import PlanetMines from "./planets/buildings/PlanetMines"
import PlanetResearch from "./planets/buildings/PlanetResearch"
import PlanetShipFactory from "./planets/buildings/PlanetShipFactory"
import PlanetSpatioport from "./planets/buildings/PlanetSpatioport"
import PlanetUniversity from "./planets/buildings/PlanetUniversity"
import ShipBuilder from "./planets/buildings/shipBuilder/ShipBuilder"
import SolarSystem3D from "./solarSystem/SolarSystem3D"
import ModalAsteroid from "./universe/ModalAsteroid"
import ModalFleet from "./universe/ModalFLeet"
import ModalPirate from "./universe/ModalPirate"
import ModalPlanet from "./universe/ModalPlanet"
import ModalSendPosition from "./universe/ModalSendPosition"
import Universe from "./universe/Universe"
import ModalShip from "./universe/ModalShip"

const RoutesContainer = styled.div`
  margin-top: 4rem;
  height: calc(100vh - 4rem);
`
const Container = styled.div`
  height: 100%;
  width: 100%;
`
interface AppRouterProps {
	children: React.ReactNode
}

const AppRouter = ({ children }: AppRouterProps) => {
	return (
		<BrowserRouter>
			{children}
			<RoutesContainer>
				<Flex fullWidth fullHeight>
					<Container>
						<Routes>
							<Route path="/planets">
								<Route path=":id" element={<PlanetMain />} />
								<Route path=":id/research" element={<PlanetResearch />} />
								<Route path=":id/shipfactory">
									<Route path="choose" element={<PlanetShipFactory />} />
									<Route path="build">
										<Route path=":shipClass" element={<ShipBuilder />} />
									</Route>
								</Route>
								<Route path=":id/mines" element={<PlanetMines />} />
								<Route path=":id/fabric" element={<PlanetFabric />} />
								<Route path=":id/caserne" element={<PlanetCaserne />} />
								<Route path=":id/university" element={<PlanetUniversity />} />
								<Route path=":id/spatioport" element={<PlanetSpatioport />} />
							</Route>
							<Route path="/fleets">
								<Route path="list" element={<Fleet />} />
								<Route path="manager">
									<Route path=":id" element={<FleetManager />} />
								</Route>
							</Route>
							<Route path="/universe" element={<Universe />} />
							<Route path="/system">
								<Route path=":id" element={<SolarSystem3D />} />
							</Route>
							<Route path="/design_system" element={<DesignSystem />} />
							<Route path="/" element={<PlanetMain />} />
							{/* <Route path="/" element={<Navigate replace to="/planets/0" />} />
							<Route path="*" element={<Navigate replace to="/planets/0" />} /> */}
						</Routes>
					</Container>
				</Flex>
				<ModalPlanet />
				<ModalFleet />
				<ModalSendPosition />
				<ModalAsteroid />
				<ModalPirate />
				<ModalShip />
			</RoutesContainer>
		</BrowserRouter>
	)
}

export default AppRouter
