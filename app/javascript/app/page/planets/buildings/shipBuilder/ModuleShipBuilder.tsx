import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { GreenButton, PinkButton } from "styles/button"
import Flex from "styles/Flex"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { IconButton } from "@mui/material"
// app:javascript:app:page:planets:buildings:shipBuilder:ModuleShipBuilder.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:shipBuilder:ModuleShipBuilder",
)
debug.log = console.log.bind(console)

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`
const StyledAddIcon = styled(AddIcon)<{ disabled: boolean }>`
  color: white;
`
const StyledRemoveIcon = styled(RemoveIcon)<{ disabled: boolean }>`
  color: white;
`
const StyledIconButton = styled(IconButton)<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const ModuleShipBuilder = ({ module, setSelectedModules, selectedModules }) => {
  let countNumberOfModules = 0
  ;(selectedModules ?? []).forEach((selectedModule) => {
    if (selectedModule.name === module.name) {
      countNumberOfModules += 1
    }
  })
  return (
    <Container>
      <p>{module.name}</p>
      <i>{module.description}</i>
      <Flex gap="1rem" alignItems="center">
        <StyledIconButton
          onClick={() => {
            setSelectedModules([...selectedModules, module])
          }}
        >
          <StyledAddIcon />
        </StyledIconButton>
        <div>{countNumberOfModules}</div>
        <StyledIconButton
          disabled={countNumberOfModules === 0}
          onClick={() => {
            let hasBeenRemoved = false
            const result = []
            selectedModules.forEach((m) => {
              if (m.name === module.name && !hasBeenRemoved) {
                hasBeenRemoved = true
                return
              } else {
                result.push(m)
              }
            })
            setSelectedModules(result)
          }}
        >
          <StyledRemoveIcon />
        </StyledIconButton>
      </Flex>
    </Container>
  )
}

export default ModuleShipBuilder
