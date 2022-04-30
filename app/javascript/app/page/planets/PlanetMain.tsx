import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import { PurpleButton, YellowButton } from "styles/button"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import usePlanets from "hooks/usePlanets"
import Flex from "styles/Flex"

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
    <Flex gap="2rem">
      <Link to={`/planets/${planetId}/research`}>
        <YellowButton disabled>Centre de recherche</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/shipfactory/choose`}>
        <YellowButton>Usine à vaisseaux</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/mines`}>
        <YellowButton disabled>Mines</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/fabric`}>
        <YellowButton disabled>Fabrique</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/caserne`}>
        <YellowButton disabled>Caserne</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/university`}>
        <YellowButton disabled>Université</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/spatioport`}>
        <YellowButton>Spatioport</YellowButton>
      </Link>
      <Link to={`/fleets/list`}>
        <YellowButton>Fleets</YellowButton>
      </Link>
      <Link to={`/universe`}>
        <PurpleButton>Univers</PurpleButton>
      </Link>
    </Flex>
  )
}

export default PlanetMain
