import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import {
  RedButton,
  RedButtonOutlined,
  YellowButtonOutlined,
} from "styles/button"
import Flex from "styles/Flex"
import { IPlanet } from "type/IPlanet"

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`

// app:javascript:app:page:universe:ModalPlanet.tsx
const debug = Debug("app:javascript:app:page:universe:ModalPlanet")
debug.log = console.log.bind(console)

const ModalPlanet = ({
  selectedPlanet,
  setSelectedPlanet,
}: {
  selectedPlanet: IPlanet
  setSelectedPlanet: (planet: IPlanet) => void
}) => {
  if (!selectedPlanet) {
    return null
  }
  return (
    <>
      <StyledDialog open={!!selectedPlanet}>
        <DialogContent>
          <Flex>
            <img src="https://eu4.s3.eu-west-3.amazonaws.com/gas_belt_1.gif" />
            <div>
              <ul>
                <li>{selectedPlanet.data.name}</li>
                <li>
                  {selectedPlanet.data.position.system}
                  {"-"}
                  {selectedPlanet.data.position.systemPosition.x}
                  {"-"}
                  {selectedPlanet.data.position.systemPosition.y}
                </li>
              </ul>
            </div>
          </Flex>
        </DialogContent>
        <DialogActions>
          <RedButtonOutlined>Envoyer une flotte</RedButtonOutlined>
        </DialogActions>
        <DialogActions>
          <YellowButtonOutlined onClick={() => setSelectedPlanet(undefined)}>
            Retour
          </YellowButtonOutlined>
        </DialogActions>
      </StyledDialog>
    </>
  )
}

export default ModalPlanet
