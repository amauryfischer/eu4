import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import Moment from "moment"
import _ from "lodash"
import useShips from "hooks/useShips"
import ShipService from "services/ShipService"
import IShip from "type/IShip"
import { getShips } from "reducer/ships/shipResource"
import { Checkbox } from "@mui/material"
import Flex from "styles/Flex"
import { YellowButton } from "styles/button"
import { createFleet } from "reducer/fleets/fleetResource"
import { YellowTextField } from "styles/testField"
import useCurrentPlanet from "hooks/useCurrentPlanet"
import useFleets from "hooks/useFleets"
import { IFleet } from "type/IFleet"

const StyledCheckbox = styled(Checkbox)`
  color: yellow !important;
`
const ClickableShipContainer = styled.div`
  cursor: pointer;
`
// app:javascript:app:page:planets:buildings:PlanetSpatioport.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:PlanetSpatioport",
)
debug.log = console.log.bind(console)

const YellowText = styled.span`
  color: yellow !important;
`

const PlanetSpatioport = ({}) => {
  // * state
  const [selectedShips, setSelectedShips] = useState([])
  const [fleetName, setFleetName] = useState("")

  // * selector
  const ships = useShips()
  const planet = useCurrentPlanet()
  const fleets = useFleets()

  // * dispatch
  const dispatch = useDispatch()

  // * history
  // const history = useHistory()

  const onToggleShip = (shipId) => {
    if (selectedShips.includes(shipId)) {
      setSelectedShips(
        selectedShips.filter((shipIdToFilter) => shipIdToFilter !== shipId),
      )
      return
    }
    setSelectedShips([...selectedShips, shipId])
  }

  const onCreateFleet = () => {
    dispatch(
      createFleet({
        data: {
          name: fleetName,
          shipIds: selectedShips,
          position: planet.data.position,
        },
      }),
    )
    setFleetName("")
    setSelectedShips([])
  }

  const shipClasses = ShipService.getAllShips()

  return (
    <>
      <Flex direction="row-reverse" fullWidth>
        <Flex gap="0.5rem" alignItems="center">
          <YellowTextField
            label="nom de la flotte"
            placeholder="nom de la flotte"
            value={fleetName}
            onChange={(e) => setFleetName(e.target.value)}
          />
          <YellowButton onClick={onCreateFleet}>Créer une flotte</YellowButton>
        </Flex>
      </Flex>
      {Object.values(ships).map((ship: IShip) => {
        if (
          Object.values(fleets).some((fleet: IFleet) =>
            fleet.data?.shipIds?.includes(ship.id),
          )
        ) {
          return null
        }
        const chassis = shipClasses[ship.data.class]
        return (
          <ClickableShipContainer
            key={ship.id}
            onClick={() => {
              onToggleShip(ship.id)
            }}
          >
            <Flex gap="0.5rem">
              <StyledCheckbox checked={selectedShips.includes(ship.id)} />
              <img src={chassis.img} width={80} />
              <YellowText>
                {ship.data.name} ({chassis.name})
              </YellowText>
            </Flex>
          </ClickableShipContainer>
        )
      })}
    </>
  )
}

export default PlanetSpatioport
