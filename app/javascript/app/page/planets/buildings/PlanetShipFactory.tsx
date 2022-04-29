import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import { Card, CardActions, CardContent } from "@mui/material"
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
import { YellowButton } from "styles/button"
const StyledCard = styled(Card)`
  margin: 2rem;
  background-color: black !important;
  color: white !important;
  //width: fit-content;
  transition: all 0.3s ease-in-out;
  border: 1px solid gold;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(var(--yellow500-rgb), 0.5) 0px 12px 24px -8px,
      rgba(var(--yellow500-rgb), 0.3) 0px 16px 20px 0px,
      rgba(var(--yellow500-rgb), 0.2) 0px 2px 20px 0px;
  }
`
const ShipContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`
const PlanetShipFactory = ({}) => {
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
              <ShipContainer>
                {Object.values(ships).map((ship) => (
                  <>
                    <StyledCard>
                      <Flex>
                        <CardMedia
                          component="img"
                          sx={{ width: 200, height: "auto" }}
                          image={ship.img}
                        />
                        <CardContent>
                          <Flex
                            direction="column"
                            justifyContent="space-between"
                            gap="2rem"
                          >
                            <div>
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
                            </div>
                          </Flex>
                        </CardContent>
                        <CardActions>
                          <YellowButton
                            onClick={() => {
                              navigate(
                                `/planets/${currentPlanetId}/shipfactory/build/${ship.class}`,
                              )
                            }}
                            startIcon={<BuildIcon />}
                          >
                            Construire
                          </YellowButton>
                        </CardActions>
                      </Flex>
                    </StyledCard>
                  </>
                ))}
              </ShipContainer>
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

export default PlanetShipFactory
