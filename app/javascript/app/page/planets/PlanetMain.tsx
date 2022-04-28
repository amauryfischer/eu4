import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import { YellowButton } from "styles/button"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import usePlanets from "hooks/usePlanets"

// app:javascript:app:page:planets:PlanetMain.tsx
const debug = Debug("app:javascript:app:page:planets:PlanetMain")
debug.log = console.log.bind(console)

const StyledCard = styled.div`
  width: 500px;
  height: 300px;
  background: linear-gradient(45deg, var(--blue700), var(--blue900));
`

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
        <YellowButton>Centre de recherche</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/spatioport/choose`}>
        <YellowButton>Spatioport</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/mines`}>
        <YellowButton>Mines</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/fabric`}>
        <YellowButton>Fabrique</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/caserne`}>
        <YellowButton>Caserne</YellowButton>
      </Link>
      <Link to={`/planets/${planetId}/university`}>
        <YellowButton>Université</YellowButton>
      </Link>
      <StyledCard></StyledCard>
    </>
  )
}

export default PlanetMain
