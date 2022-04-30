import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { getShips } from "reducer/ships/shipResource"
import { getFleets } from "reducer/fleets/fleetResource"

// app:javascript:app:SynchroWrapper.tsx
const debug = Debug("app:javascript:app:SynchroWrapper")
debug.log = console.log.bind(console)

const SynchroWrapper = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getShips())
    dispatch(getFleets())
  }, [])
  return <>{children}</>
}

export default SynchroWrapper
