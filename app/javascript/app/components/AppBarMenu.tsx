import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import styled from "styled-components"
import * as React from "react"
import { useEffect } from "react"
import Flex from "../styles/Flex"
import useResources from "../hooks/useResources"
import { addResource } from "../redux/resources/resourcesReducer"
import { useDispatch, useSelector } from "react-redux"
import AutomaticService from "../services/AutomaticService"
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

  return (
    <StyledAppBar position="static">
      <Flex gap="1rem">
        {Object.entries(resources).map(([key, value]) => (
          <ResourcesBox key={key}>
            <Box>
              {key} : {value}
            </Box>
          </ResourcesBox>
        ))}
      </Flex>
    </StyledAppBar>
  )
}
