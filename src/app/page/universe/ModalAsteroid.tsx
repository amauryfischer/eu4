import styled from "styled-components"
import React, { Suspense } from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import Flex from "styles/Flex"
import { Canvas } from "@react-three/fiber"
import { useDispatch } from "react-redux"
import Image3D from "../solarSystem/Image3D"
import { OrbitControls } from "@react-three/drei"

import {
  setCurrentAsteroid,
  setCurrentFleet,
  setCurrentPirate,
  setCurrentSendPosition,
} from "reducer/current/currentReducer"
import useCurrentAsteroid from "hooks/currentData/useCurrentAsteroid"
import useFleetsOnPosition from "hooks/utils/useFleetsOnPosition"
import ShipService from "services/ShipService"
import useShips from "hooks/data/useShips"
import RenderResources from "components/RenderResources"
import useCollectAsteroid from "hooks/actions/useCollectAsteroid"
import SButton from "styles/SButton"
import StandardButton from "components/molecules/Buttons/StandardButton"
import Modal from "components/organisms/Modal"
import ListFleet from "components/organisms/List/ListFleets/ListFleets"

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 100px 100px 250px 250px;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
`

const ModalAsteroid = () => {
  const dispatch = useDispatch()
  const currentAsteroid = useCurrentAsteroid()
  const ships = useShips()
  const collectAsteroid = useCollectAsteroid()
  const fleets = useFleetsOnPosition(currentAsteroid?.data.position)
  if (!currentAsteroid) {
    return null
  }
  return (
    <>
      <Modal
        open={!!currentAsteroid}
        toggle={() => dispatch(setCurrentAsteroid(undefined))}
        title={currentAsteroid.data.name ?? "Asteroid"}
        childrenActions={
          <>
            <StandardButton.SendFleet
              onClick={() => {
                dispatch(setCurrentSendPosition(currentAsteroid.data.position))
              }}
            />
            <StandardButton.CloseElement
              onClick={() => {
                dispatch(setCurrentAsteroid(undefined))
              }}
            />
          </>
        }
      >
        <Flex direction="column" alignItems="start" fullWidth>
          <CanvasContainer>
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Image3D
                  sizeMultiplier={3}
                  position={[0, 0, 0]}
                  imageUrl={`/images/other/asteroid.png`}
                />
              </Suspense>
              <OrbitControls
                enableZoom={true}
                makeDefault
                autoRotate
                autoRotateSpeed={1}
              />
            </Canvas>
          </CanvasContainer>
          <div>
            <h2>Coordonnées</h2>
            <ul>
              <li>
                {currentAsteroid.data.position.system}
                {":"}
                {currentAsteroid.data.position.systemPosition.x}
                {":"}
                {currentAsteroid.data.position.systemPosition.y}
                {":"}
                {currentAsteroid.data.position.systemPosition.z}
              </li>
            </ul>
          </div>
          <div>
            <h2>Resources présentes</h2>
            <RenderResources resources={currentAsteroid.data.resources} />
          </div>
          <div>
            <h2>Actions</h2>
            <ListFleet
              fleets={fleets}
              additionalRows={(fleet) => (
                <SButton
                  variant="outlined"
                  $color="purple"
                  onClick={() => {
                    collectAsteroid({
                      fleetId: fleet.id,
                      asteroidId: currentAsteroid.id,
                    })
                  }}
                >
                  Collecter
                </SButton>
              )}
            />
          </div>
        </Flex>
      </Modal>
    </>
  )
}

export default ModalAsteroid
