import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import { PrimaryButton } from "styles/button"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

// app:javascript:app:page:planets:PlanetMain.tsx
const debug = Debug("app:javascript:app:page:planets:PlanetMain")
debug.log = console.log.bind(console)

const PlanetMain = ({}) => {
  const { id: planetId } = useParams()
  return (
    <>
      <Link to={`/planets/${planetId}/research`}>
        <PrimaryButton>Centre de recherche</PrimaryButton>
      </Link>
      <Link to={`/planets/${planetId}/spatioport`}>
        <PrimaryButton>Spatioport</PrimaryButton>
      </Link>
      <Link to={`/planets/${planetId}/mines`}>
        <PrimaryButton>Mines</PrimaryButton>
      </Link>
      <Link to={`/planets/${planetId}/fabric`}>
        <PrimaryButton>Fabrique</PrimaryButton>
      </Link>
      <Link to={`/planets/${planetId}/caserne`}>
        <PrimaryButton>Caserne</PrimaryButton>
      </Link>
      <Link to={`/planets/${planetId}/university`}>
        <PrimaryButton>Université</PrimaryButton>
      </Link>
    </>
  )
}

export default PlanetMain
