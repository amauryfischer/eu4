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
import { setCurrentPirate } from "reducer/current/currentReducer"
import useCurrentPirate from "hooks/currentData/useCurrentPirate"
import SButton from "styles/SButton"
import Modal from "components/organisms/Modal"
import StandardButton from "components/molecules/Buttons/StandardButton"
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

const ModalPirate = () => {
  const dispatch = useDispatch()
  const pirate = useCurrentPirate()

  if (!pirate) {
    return null
  }
  return (
    <>
      <Modal
        open={!!pirate}
        title={pirate.data.name ?? "Pirate"}
        toggle={() => dispatch(setCurrentPirate(null))}
        childrenActions={
          <StandardButton.CloseElement
            onClick={() => {
              dispatch(setCurrentPirate(null))
            }}
          />
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
                  imageUrl={`/images/other/pirate.png`}
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
                {pirate.data.position.system}
                {":"}
                {pirate.data.position.systemPosition.x}
                {":"}
                {pirate.data.position.systemPosition.y}
                {":"}
                {pirate.data.position.systemPosition.z}
              </li>
            </ul>
          </div>
          <div>
            <h2>Actions</h2>
            <SButton $color="red" onClick={() => {}}>
              Attaquer
            </SButton>
          </div>
        </Flex>
      </Modal>
    </>
  )
}

export default ModalPirate
