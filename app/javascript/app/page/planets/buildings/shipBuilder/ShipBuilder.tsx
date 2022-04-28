import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import ShipService from "services/ShipService"
import _ from "lodash"
import CustomTabs from "components/CustomTabs"
import DeblurIcon from "@mui/icons-material/Deblur"
import ModulesService, { IModuleType } from "services/ModulesService"
import { Button } from "@mui/material"
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
// app:javascript:app:page:planets:buildings:ShipBuilder.tsx
const debug = Debug("app:javascript:app:page:planets:buildings:ShipBuilder")
debug.log = console.log.bind(console)

const ShipPropertyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 15fr);
`

const ShipBuilder = ({}) => {
  const { name } = useParams()
  const currentShip = ShipService.getAllShips()[name]
  const modules = Object.values(ModulesService.getAllModules())
  const [selectedModules, setSelectedModules] = useState<IModule[]>([])
  const dispatch = useDispatch()
  const modulesEmplacement = _.sumBy(selectedModules, (m) => m.emplacement)
  const onSubmit = () => {
    dispatch(
      createShip({
        ship: {
          modules,
          selectedModules,
          ...currentShip,
        },
      }),
    )
  }
  let totalCargo = 0
  let totalImpulsion = 0
  let totalShield = 0
  let totalWarp = 0
  let totalFuel = currentShip.fuelSpace
  let totalCoque = currentShip.baseCoque
  let totalConso = 0
  selectedModules.forEach((m) => {
    Object.keys(m.modifier).forEach((mod) => {
      if (mod === IModifier.CARGO) {
        totalCargo += m.modifier[mod]
      }
      if (mod === IModifier.IMPULSION) {
        totalImpulsion += m.modifier[mod] * currentShip.multiplier.impulse
      }
      if (mod === IModifier.SHIELD) {
        totalShield += m.modifier[mod]
      }
      if (mod === IModifier.WARP) {
        totalWarp += m.modifier[mod] * currentShip.multiplier.warp
      }
      if (mod === IModifier.FUEL) {
        totalFuel += m.modifier[mod]
      }
      if (mod === IModifier.COQUE) {
        totalCoque += m.modifier[mod]
      }
      if (mod === IModifier.CONSO) {
        totalConso += m.modifier[mod] * currentShip.multiplier.conso
      }
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
      <Flex justifyContent="space-between">
        <img src={currentShip.img} height={200} />
        <Flex direction="column">
          <div>
            Emplacements : {modulesEmplacement} / {currentShip.emplacement}
          </div>
          {Object.keys(numberModulePerName).map((moduleName) => (
            <div>
              {numberModulePerName[moduleName]} x {moduleName}
            </div>
          ))}
        </Flex>
        <Flex direction="column">
          {[
            {
              name: "Cargo",
              icon: <Inventory2Icon />,
              totalAmount: totalCargo,
            },
            {
              name: "Impulsion",
              icon: <DeblurIcon />,
              totalAmount: totalImpulsion,
            },
            {
              name: "Shield",
              icon: <SecurityIcon />,
              totalAmount: totalShield,
            },
            {
              name: "Warp",
              icon: <RocketLaunchIcon />,
              totalAmount: totalWarp,
            },
            {
              name: "Fuel",
              icon: <BatteryCharging80Icon />,
              totalAmount: totalFuel,
            },
            {
              name: "Coque",
              icon: <FavoriteIcon />,
              totalAmount: totalCoque,
            },
            {
              name: "Conso",
              icon: <LocalGasStationIcon />,
              totalAmount: totalConso,
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
        <YellowButton
          startIcon={<BuildIcon />}
          disabled={modulesEmplacement > currentShip.emplacement}
          onClick={onSubmit}
        >
          Créer
        </YellowButton>
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
