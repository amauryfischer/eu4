import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import useFleet from "hooks/useFleet"
import Flex from "styles/Flex"
import { YellowTextField } from "styles/testField"
import { YellowButton } from "styles/button"
import { updateFleet } from "reducer/fleets/fleetResource"

// app:javascript:app:page:fleets:FleetManager.tsx
const debug = Debug("app:javascript:app:page:fleets:FleetManager")
debug.log = console.log.bind(console)

const FleetManager = ({}) => {
  const fleet = useFleet()
  const [system, setSystem] = useState(fleet?.data?.position?.system)
  const [x, setX] = useState(fleet?.data?.position?.systemPosition?.x)
  const [y, setY] = useState(fleet?.data?.position?.systemPosition?.y)
  const dispatch = useDispatch()

  const moveFleet = () => {
    dispatch(
      updateFleet({
        ...fleet,
        data: { ...fleet.data, position: { system, systemPosition: { x, y } } },
      }),
    )
  }

  return (
    <Flex direction="column">
      <h1>{fleet?.data?.name}</h1>
      <YellowTextField
        label="Systeme solaire"
        value={system}
        onChange={(e) => setSystem(e.target.value)}
      />
      <YellowTextField
        label="X"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <YellowTextField
        label="Y"
        onChange={(e) => setY(e.target.value)}
        value={y}
      />
      <YellowButton onClick={moveFleet}>Déplacer</YellowButton>
    </Flex>
  )
}

export default FleetManager
