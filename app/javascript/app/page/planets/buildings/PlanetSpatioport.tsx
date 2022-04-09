import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import { Card, CardContent } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import CustomTabs from "components/CustomTabs"
import BuildIcon from "@mui/icons-material/Build"
import Debug from "debug"
import React from "react"
import ShipService from "services/ShipService"
import Flex from "styles/Flex"
import ResourcesService from "services/ResourcesService"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import styled from "styled-components"

// app:javascript:app:page:planets:buildings:PlanetSpatioport.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:PlanetSpatioport",
)
debug.log = console.log.bind(console)
const StyledCard = styled(Card)`
  margin: 2rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
`
const PlanetSpatioport = ({}) => {
  const ships = ShipService.getAllShips()
  const allResources = ResourcesService.getAllResources()
  const currentPlanetId = useSelector((state: any) => state.current.planetId)
  const navigate = useNavigate()
  return (
    <>
      <CustomTabs
        tabChildrens={[
          {
            key: "Vaisseaux",
            render: (
              <Flex direction="column">
                {Object.values(ships).map((ship) => (
                  <>
                    <StyledCard>
                      <Flex>
                        <CardMedia
                          component="img"
                          sx={{ width: 200, height: "auto" }}
                          image={ship.img}
                        />
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h5">
                            {ship.class}
                          </Typography>
                        </CardContent>
                        <CardContent>
                          {Object.keys(ship.cost).map((resource) => (
                            <Flex alignItems="center" gap="0.5rem">
                              <img
                                width={20}
                                height={20}
                                src={allResources[resource].img}
                              />
                              <div>{allResources[resource].name}</div>
                              <div>{ship.cost[resource]}</div>
                            </Flex>
                          ))}
                        </CardContent>
                        <CardContent>
                          <IconButton
                            onClick={() => {
                              navigate(
                                `/planets/${currentPlanetId}/spatioport/build/${ship.class}`,
                              )
                            }}
                          >
                            <BuildIcon />
                          </IconButton>
                        </CardContent>
                      </Flex>
                    </StyledCard>
                  </>
                ))}
              </Flex>
            ),
          },
          {
            key: "Stations",
            render: <></>,
          },
          {
            key: "Défenses",
            render: <></>,
          },
        ]}
      />
    </>
  )
}

export default PlanetSpatioport
