import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import useFleets from "hooks/useFleets"
import Flex from "styles/Flex"
import { IFleet } from "type/IFleet"
import { YellowButtonOutlined } from "styles/button"
import { useNavigate } from "react-router"

// app:javascript:app:page:fleets:Fleet.tsx
const debug = Debug("app:javascript:app:page:fleets:Fleet")
debug.log = console.log.bind(console)

const Fleet = ({}) => {
  const fleets = useFleets()

  const navigate = useNavigate()
  return (
    <Flex direction="column" gap="2rem">
      {Object.values(fleets).map((fleet: IFleet) => (
        <Flex justifyContent="space-between" key={fleet.id}>
          <div>{fleet.data.name}</div>
          <YellowButtonOutlined
            onClick={() => {
              navigate(`/fleets/manager/${fleet.id}`)
            }}
          >
            Gérer
          </YellowButtonOutlined>
        </Flex>
      ))}
    </Flex>
  )
}

export default Fleet
