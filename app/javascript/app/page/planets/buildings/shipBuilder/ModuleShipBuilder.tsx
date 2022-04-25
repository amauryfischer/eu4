import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { GreenButton, PinkButton } from "styles/button"
import Flex from "styles/Flex"

// app:javascript:app:page:planets:buildings:shipBuilder:ModuleShipBuilder.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:shipBuilder:ModuleShipBuilder",
)
debug.log = console.log.bind(console)

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const ModuleShipBuilder = ({ module, setSelectedModules, selectedModules }) => {
  return (
    <Container>
      <p>{module.name}</p>
      <i>{module.description}</i>
      <Flex gap="1rem">
        <GreenButton
          onClick={() => {
            setSelectedModules([...selectedModules, module])
          }}
        >
          Ajouter
        </GreenButton>
        <PinkButton
          onClick={() => {
            setSelectedModules(
              selectedModules.filter((m) => m.name !== module.name),
            )
          }}
        >
          Retirer
        </PinkButton>
      </Flex>
    </Container>
  )
}

export default ModuleShipBuilder
