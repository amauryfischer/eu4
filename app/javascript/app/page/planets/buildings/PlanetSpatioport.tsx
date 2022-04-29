import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import Moment from "moment"
import _ from "lodash"
import useShips from "hooks/useShips"

// app:javascript:app:page:planets:buildings:PlanetSpatioport.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:PlanetSpatioport",
)
debug.log = console.log.bind(console)

const PlanetSpatioport = ({}) => {
  // * state
  //const [state, setState] = useState({})

  // * selector
  const ships = useShips()
  // const selector = useSelector(state => state)

  // * dispatch
  // const dispatch = useDispatch()

  // * history
  // const history = useHistory()

  // * useEffect
  // useEffect(() => {
  //   // * effect
  // }, [])

  return <></>
}

export default PlanetSpatioport
