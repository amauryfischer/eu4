import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import PlanetMain from "./planets/PlanetMain"
import { Navigate } from "react-router"
import Fleet from "./fleets/Fleet"
import Universe from "./universe/Universe"
import UniverseParcel from "./universe/UniverseParcel"
import PlanetResearch from "./planets/buildings/PlanetResearch"
import PlanetSpatioport from "./planets/buildings/PlanetSpatioport"
import PlanetMines from "./planets/buildings/PlanetMines"
import PlanetFabric from "./planets/buildings/PlanetFabric"
import PlanetCaserne from "./planets/buildings/PlanetCaserne"
import PlanetUniversity from "./planets/buildings/PlanetUniversity"

// app:javascript:app:components:AppRouter.tsx
const debug = Debug("app:javascript:app:components:AppRouter")
debug.log = console.log.bind(console)

const AppRouter = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/planets">
          <Route path=":id" element={<PlanetMain />} />
          <Route path=":id/research" element={<PlanetResearch />} />
          <Route path=":id/spatioport" element={<PlanetSpatioport />} />
          <Route path=":id/mines" element={<PlanetMines />} />
          <Route path=":id/fabric" element={<PlanetFabric />} />
          <Route path=":id/caserne" element={<PlanetCaserne />} />
          <Route path=":id/university" element={<PlanetUniversity />} />
        </Route>
        <Route path="/fleets" element={<Fleet />} />
        <Route path="/universe" element={<Universe />}>
          <Route path=":id" element={<UniverseParcel />} />
        </Route>
        <Route path="/" element={<Navigate replace to="/planets/0" />} />
        <Route path="*" element={<Navigate replace to="/planets/0" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
