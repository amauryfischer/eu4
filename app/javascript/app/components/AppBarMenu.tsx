import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import styled from "styled-components"
import * as React from "react"
import { useEffect } from "react"
import Flex from "../styles/Flex"
import useResources from "../hooks/useResources"
import { addResource } from "../reducer/resources/resourcesReducer"
import { useDispatch, useSelector } from "react-redux"
import AutomaticService from "../services/AutomaticService"
import ResourcesService from "services/ResourcesService"
const ResourcesBox = styled.div`
  width: fit-content;
`

const StyledAppBar = styled(AppBar)`
  padding: 0.25rem;
`
export default function PrimarySearchAppBar() {
  const resources = useResources()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  useEffect(() => {
    setInterval(() => AutomaticService.gameLoop(state, dispatch), 10000)
  }, [])
  const allResources = ResourcesService.getAllResources()
  return (
    <StyledAppBar position="static">
      <Flex gap="1.5rem">
        {Object.entries(resources).map(([key, value]) => (
          <ResourcesBox key={key}>
            <Flex alignItems="center" gap="0.5rem">
              <img src={allResources[key].img} width={25} height={25} />
              <div>{key}</div>
              <div>{value}</div>
            </Flex>
          </ResourcesBox>
        ))}
      </Flex>
    </StyledAppBar>
  )
}
