import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import Modal from "components/organisms/Modal"
import useCurrentSendPosition from "hooks/currentData/useCurrentSendPosition"
import useFleets from "hooks/data/useFleets"
import useShips from "hooks/data/useShips"
import React from "react"
import { useDispatch } from "react-redux"
import { setCurrentSendPosition } from "reducer/current/currentReducer"
import { updateFleet } from "reducer/fleets/fleetResources"
import ShipService from "services/ShipService"
import styled from "styled-components"
import Increase from "styles/animation/icons/Increase"
import SButton from "styles/SButton"

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 100px 140px 250px;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
`
const ModalSendPosition = () => {
  const fleets = useFleets()
  const ships = useShips()
  const currentSendPosition = useCurrentSendPosition()
  const dispatch = useDispatch()
  return (
    <Modal
      open={!!currentSendPosition}
      toggle={() => {
        dispatch(setCurrentSendPosition(undefined))
      }}
      title="Selectionnez une flotte"
      childrenActions={
        <>
          <SButton
            magnetic={false}
            variant="outlined"
            $color="caramel"
            onClick={() => dispatch(setCurrentSendPosition(undefined))}
          >
            Fermer
          </SButton>
        </>
      }
    >
      <GridContainer>
        {(Object.values(fleets) ?? []).map((fleet) => {
          const shipId = fleet.data.shipIds[0]
          return (
            <React.Fragment key={fleet.id}>
              <img
                width={250}
                height={100}
                src={
                  ShipService.getAllShips()[ships?.[shipId]?.data?.class]?.img
                }
              />
              <div>{fleet.data.name}</div>
              <div>
                {fleet.data.position.system}
                {":"}
                {fleet.data.position.systemPosition.x}
                {":"}
                {fleet.data.position.systemPosition.y}
                {":"}
                {fleet.data.position.systemPosition.z}
              </div>
              <SButton
                variant="contained"
                Icon={Increase}
                $color="blue"
                disabled={
                  fleet.data.position.system === currentSendPosition?.system &&
                  fleet.data.position.systemPosition.x ===
                    currentSendPosition?.systemPosition.x &&
                  fleet.data.position.systemPosition.y ===
                    currentSendPosition?.systemPosition.y &&
                  fleet.data.position.systemPosition.z ===
                    currentSendPosition?.systemPosition.z
                }
                onClick={() => {
                  dispatch(
                    updateFleet({
                      ...fleet,
                      data: {
                        ...fleet.data,
                        position: {
                          ...fleet.data.position,
                          system: currentSendPosition.system,
                          systemPosition: {
                            ...fleet.data.position.systemPosition,
                            x: currentSendPosition.systemPosition.x,
                            y: currentSendPosition.systemPosition.y,
                            z: currentSendPosition.systemPosition.z,
                          },
                        },
                      },
                    }),
                  )
                  dispatch(setCurrentSendPosition(undefined))
                }}
              >
                Envoyer
              </SButton>
            </React.Fragment>
          )
        })}
      </GridContainer>
    </Modal>
  )
}

export default ModalSendPosition
