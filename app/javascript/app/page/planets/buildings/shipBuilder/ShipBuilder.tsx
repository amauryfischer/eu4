import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router"
import ShipService from "services/ShipService"
import _ from "lodash"
import CustomTabs from "components/CustomTabs"
import DeblurIcon from "@mui/icons-material/Deblur"
import ModulesService, { IModuleType } from "services/ModulesService"
import { Button, TextField } from "@mui/material"
import {
  BlueButton,
  GreenButton,
  PinkButton,
  RedButton,
  YellowButton,
} from "styles/button"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import { createShip } from "reducer/ships/shipResource"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import SecurityIcon from "@mui/icons-material/Security"
import Flex from "styles/Flex"
import { IModifier, IModule } from "type/IModule"
import ModuleShipBuilder from "./ModuleShipBuilder"
import { number } from "prop-types"
import BuildIcon from "@mui/icons-material/Build"
import { YellowTextField } from "styles/testField"
import ResourcesService, {
  ALUMINUM,
  AZOTE,
  CUIVRE,
  FER,
  HYDROGENE,
  SILICIUM,
  TITANE,
  URANIUM,
} from "services/ResourcesService"
// app:javascript:app:page:planets:buildings:ShipBuilder.tsx
const debug = Debug("app:javascript:app:page:planets:buildings:ShipBuilder")
debug.log = console.log.bind(console)

const ShipPropertyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 15fr);
  column-gap: 2em;
`

const ShipBuilder = ({}) => {
  const { shipClass } = useParams()
  const currentShipClass = ShipService.getAllShips()[shipClass]
  const modules = Object.values(ModulesService.getAllModules())
  const [selectedModules, setSelectedModules] = useState<IModule[]>([])
  const [shipName, setShipName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const modulesEmplacement = _.sumBy(selectedModules, (m) => m.emplacement)
  const onSubmit = () => {
    dispatch(
      createShip({
        data: {
          name: shipName,
          modules: selectedModules,
          class: shipClass,
        },
      }),
    )
    navigate(`/planets/${id}`)
  }

  const totalStat = {
    cargo: 0,
    impulsion: 0,
    shield: 0,
    warp: 0,
    fuel: currentShipClass.fuelSpace,
    coque: currentShipClass.baseCoque,
    conso: 0,
  }
  const totalResources = {
    [TITANE.name]: currentShipClass.cost[TITANE.name] ?? 0,
    [CUIVRE.name]: currentShipClass.cost[CUIVRE.name] ?? 0,
    [FER.name]: currentShipClass.cost[FER.name] ?? 0,
    [ALUMINUM.name]: currentShipClass.cost[ALUMINUM.name] ?? 0,
    [SILICIUM.name]: currentShipClass.cost[SILICIUM.name] ?? 0,
    [URANIUM.name]: currentShipClass.cost[URANIUM.name] ?? 0,
    [AZOTE.name]: currentShipClass.cost[AZOTE.name] ?? 0,
    [HYDROGENE.name]: currentShipClass.cost[HYDROGENE.name] ?? 0,
  }

  selectedModules.forEach((m) => {
    Object.keys(m.modifier).forEach((mod) => {
      if (mod === IModifier.CARGO) {
        totalStat.cargo += m.modifier[mod]
      }
      if (mod === IModifier.IMPULSION) {
        totalStat.impulsion +=
          m.modifier[mod] * currentShipClass.multiplier.impulse
      }
      if (mod === IModifier.SHIELD) {
        totalStat.shield += m.modifier[mod]
      }
      if (mod === IModifier.WARP) {
        totalStat.warp += m.modifier[mod] * currentShipClass.multiplier.warp
      }
      if (mod === IModifier.FUEL) {
        totalStat.fuel += m.modifier[mod]
      }
      if (mod === IModifier.COQUE) {
        totalStat.coque += m.modifier[mod]
      }
      if (mod === IModifier.CONSO) {
        totalStat.conso += m.modifier[mod] * currentShipClass.multiplier.conso
      }
    })
    Object.entries(m.cost).map(([resourceName, resourceAmount]) => {
      totalResources[resourceName] += resourceAmount
    })
  })
  const numberModulePerName = {}
  selectedModules.forEach((module) => {
    if (!numberModulePerName[module.name]) {
      numberModulePerName[module.name] = 0
    }
    numberModulePerName[module.name] += 1
  })
  return (
    <Flex direction="column">
      <Flex gap="4rem">
        <img src={currentShipClass.img} height={200} />

        <Flex direction="column">
          {[
            {
              name: "Cargo",
              icon: <Inventory2Icon />,
              totalAmount: totalStat.cargo,
            },
            {
              name: "Impulsion",
              icon: <DeblurIcon />,
              totalAmount: totalStat.impulsion,
            },
            {
              name: "Shield",
              icon: <SecurityIcon />,
              totalAmount: totalStat.shield,
            },
            {
              name: "Warp",
              icon: <RocketLaunchIcon />,
              totalAmount: totalStat.warp,
            },
            {
              name: "Fuel",
              icon: <BatteryCharging80Icon />,
              totalAmount: totalStat.fuel,
            },
            {
              name: "Coque",
              icon: <FavoriteIcon />,
              totalAmount: totalStat.coque,
            },
            {
              name: "Conso",
              icon: <LocalGasStationIcon />,
              totalAmount: totalStat.conso,
            },
          ].map((shipProperty) => (
            <ShipPropertyContainer>
              <Flex gap="0.5rem">
                <div>{shipProperty.icon}</div>
                <div>{shipProperty.name}</div>
              </Flex>
              <div>{shipProperty.totalAmount}</div>
            </ShipPropertyContainer>
          ))}
        </Flex>
        <Flex direction="column">
          <div>
            Emplacements : {modulesEmplacement} / {currentShipClass.emplacement}
          </div>
          {Object.keys(numberModulePerName).map((moduleName) => (
            <div>
              {numberModulePerName[moduleName]} x {moduleName}
            </div>
          ))}
        </Flex>
        <Flex direction="column">
          {Object.values(ResourcesService.getAllResources()).map((resource) => (
            <ShipPropertyContainer>
              <Flex gap="0.5rem">
                <img src={resource.img} height={30} />
                <div>{resource.name}</div>
              </Flex>
              <div>{totalResources[resource.name]}</div>
            </ShipPropertyContainer>
          ))}
        </Flex>
        <Flex gap="1rem" align-items="center">
          <YellowTextField
            value={shipName}
            onChange={(e) => setShipName(e.target.value)}
          />
          <YellowButton
            startIcon={<BuildIcon />}
            disabled={modulesEmplacement > currentShipClass.emplacement}
            onClick={onSubmit}
          >
            Créer
          </YellowButton>
        </Flex>
      </Flex>
      <CustomTabs
        tabChildrens={[
          { label: "Moteurs", type: IModuleType.ENGINE },
          { label: "Cargo", type: IModuleType.CARGO },
          { label: "Armes", type: IModuleType.WEAPON },
          { label: "Défense", type: IModuleType.DEFENSE },
          { label: "Autre", type: IModuleType.OTHER },
        ].map((category) => {
          return {
            key: category.label,
            render: (
              <>
                {modules
                  .filter((m) => m.type === category.type)
                  .map((module) => (
                    <ModuleShipBuilder
                      module={module}
                      setSelectedModules={setSelectedModules}
                      selectedModules={selectedModules}
                    />
                  ))}
              </>
            ),
          }
        })}
      />
    </Flex>
  )
}

export default ShipBuilder
