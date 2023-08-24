import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import PlanetMain from "./planets/PlanetMain"
import { Navigate } from "react-router"
import Fleet from "./fleets/Fleet"
import Universe from "./universe/Universe"
import PlanetResearch from "./planets/buildings/PlanetResearch"
import PlanetMines from "./planets/buildings/PlanetMines"
import PlanetFabric from "./planets/buildings/PlanetFabric"
import PlanetCaserne from "./planets/buildings/PlanetCaserne"
import PlanetUniversity from "./planets/buildings/PlanetUniversity"
import ShipBuilder from "./planets/buildings/shipBuilder/ShipBuilder"
import PlanetShipFactory from "./planets/buildings/PlanetShipFactory"
import PlanetSpatioport from "./planets/buildings/PlanetSpatioport"
import FleetManager from "./fleets/FleetManager"
import Test from "./solarSystem/SolarSystem3D"
import SolarSystem3D from "./solarSystem/SolarSystem3D"
import DesignSystem from "./designSystem/DesignSystem"
import Flex from "@/ui/atoms/Flex/Flex"
import ModalPlanet from "./universe/ModalPlanet"
import ModalFleet from "./universe/ModalFLeet"
import ModalAsteroid from "./universe/ModalAsteroid"

const RoutesContainer = styled.div`
  margin-top: 3rem;
  height: calc(100vh - 3rem);
`
const Container = styled.div`
  padding: var(--spacing-8);
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
			</RoutesContainer>
		</BrowserRouter>
	)
}

export default AppRouter
