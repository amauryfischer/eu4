import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import { BlueButton } from "styles/button"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import usePlanets from "hooks/usePlanets"

// app:javascript:app:page:planets:PlanetMain.tsx
const debug = Debug("app:javascript:app:page:planets:PlanetMain")
debug.log = console.log.bind(console)

const PlanetMain = ({}) => {
  const { id: planetId } = useParams()
  const planets = usePlanets()
  const navigate = useNavigate()
  if (!planets[planetId]) {
    navigate(`/planets/${Object.keys(planets)?.[0]}`)
  }
  return (
    <>
      <Link to={`/planets/${planetId}/research`}>
        <BlueButton>Centre de recherche</BlueButton>
      </Link>
      <Link to={`/planets/${planetId}/spatioport/choose`}>
        <BlueButton>Spatioport</BlueButton>
      </Link>
      <Link to={`/planets/${planetId}/mines`}>
        <BlueButton>Mines</BlueButton>
      </Link>
      <Link to={`/planets/${planetId}/fabric`}>
        <BlueButton>Fabrique</BlueButton>
      </Link>
      <Link to={`/planets/${planetId}/caserne`}>
        <BlueButton>Caserne</BlueButton>
      </Link>
      <Link to={`/planets/${planetId}/university`}>
        <BlueButton>Université</BlueButton>
      </Link>
    </>
  )
}

export default PlanetMain
