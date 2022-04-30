import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import useFleet from "hooks/useFleet"
import Flex from "styles/Flex"
import { YellowTextField } from "styles/testField"

// app:javascript:app:page:fleets:FleetManager.tsx
const debug = Debug("app:javascript:app:page:fleets:FleetManager")
debug.log = console.log.bind(console)

const FleetManager = ({}) => {
  const fleet = useFleet()
  return (
    <Flex direction="column">
      <h1>{fleet?.data?.name}</h1>
      <YellowTextField label="Galaxie" value={fleet?.data?.position?.galaxy} />
      <YellowTextField label="X" value={fleet?.data?.position?.system?.x} />
      <YellowTextField label="Y" value={fleet?.data?.position?.system?.y} />
    </Flex>
  )
}

export default FleetManager
