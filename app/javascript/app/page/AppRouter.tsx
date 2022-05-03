import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import PlanetMain from "./planets/PlanetMain"
import { Navigate } from "react-router"
import Fleet from "./fleets/Fleet"
import Universe from "./universe/Universe"
import UniverseParcel from "./universe/SolarSystem"
import PlanetResearch from "./planets/buildings/PlanetResearch"
import PlanetMines from "./planets/buildings/PlanetMines"
import PlanetFabric from "./planets/buildings/PlanetFabric"
import PlanetCaserne from "./planets/buildings/PlanetCaserne"
import PlanetUniversity from "./planets/buildings/PlanetUniversity"
import ShipBuilder from "./planets/buildings/shipBuilder/ShipBuilder"
import PlanetShipFactory from "./planets/buildings/PlanetShipFactory"
import PlanetSpatioport from "./planets/buildings/PlanetSpatioport"
import FleetManager from "./fleets/FleetManager"
import ParcelDetails from "./universe/ParcelDetails"
import SolarSystem from "./universe/SolarSystem"

// app:javascript:app:components:AppRouter.tsx
const debug = Debug("app:javascript:app:components:AppRouter")
debug.log = console.log.bind(console)

const AppRouter = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
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
          <Route path=":id" element={<SolarSystem />} />
          <Route path="/system/:id/parcelDetails">
            <Route path=":parcelId" element={<ParcelDetails />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate replace to="/planets/0" />} />
        <Route path="*" element={<Navigate replace to="/planets/0" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
