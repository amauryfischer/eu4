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
// app:javascript:app:page:planets:buildings:PlanetSpatioport.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:PlanetSpatioport",
)
debug.log = console.log.bind(console)

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
              <>
                {Object.values(ships).map((ship) => (
                  <>
                    <Card>
                      <Flex>
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
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
                                width={40}
                                height={40}
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
                    </Card>
                  </>
                ))}
              </>
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
