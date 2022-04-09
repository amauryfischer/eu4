import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import styled from "styled-components"
import * as React from "react"
import { useEffect } from "react"
import Flex from "../styles/Flex"
import useResources from "../hooks/useResources"
import { useDispatch, useSelector } from "react-redux"
import HomeIcon from "@mui/icons-material/Home"
import AutomaticService from "../services/AutomaticService"
import ResourcesService from "services/ResourcesService"
import usePlanets from "hooks/usePlanets"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
const ResourcesBox = styled.div`
  width: fit-content;
`

const StyledAppBar = styled(AppBar)`
  padding: 0.25rem;
`

const StyledHomeIcon = styled(HomeIcon)`
  color: white;
`
export default function PrimarySearchAppBar() {
  const planets = usePlanets()
  const navigate = useNavigate()
  const currentPlanets = Object.values(planets)?.[0] ?? ({} as any)
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  useEffect(() => {
    AutomaticService.gameLoop(state, dispatch)
    setInterval(() => AutomaticService.gameLoop(state, dispatch), 10000)
  }, [])
  const allResources = ResourcesService.getAllResources()
  const renderValue = (value) => {
    if (value < 1_000) {
      return value
    }
    if (value < 1_000_000) {
      return `${(value / 1_000).toFixed(2)}k`
    }
    if (value < 1_000_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`
    }
    return `${(value / 1_000_000_000).toFixed(2)}B`
  }
  return (
    <StyledAppBar position="static">
      <Flex gap="1.5rem" alignItems="center">
        <IconButton
          onClick={() => {
            navigate("/")
          }}
        >
          <StyledHomeIcon />
        </IconButton>
        {Object.entries(currentPlanets?.resources ?? {}).map(([key, value]) => (
          <ResourcesBox key={key}>
            <Flex alignItems="center" gap="0.5rem">
              <img src={allResources[key].img} width={25} height={25} />
              <div>{key}</div>
              <div>{renderValue(value)}</div>
            </Flex>
          </ResourcesBox>
        ))}
      </Flex>
    </StyledAppBar>
  )
}
