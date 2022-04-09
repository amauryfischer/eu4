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
import { BlueButton } from "styles/button"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import { createShip } from "reducer/ships/shipResource"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import SecurityIcon from "@mui/icons-material/Security"
import Flex from "styles/Flex"
import { IModifier, IModule } from "type/IModule"
// app:javascript:app:page:planets:buildings:ShipBuilder.tsx
const debug = Debug("app:javascript:app:page:planets:buildings:ShipBuilder")
debug.log = console.log.bind(console)

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
  return (
    <>
      <img src={currentShip.img} height={40} width={40} />
      Emplacements : {modulesEmplacement} / {currentShip.emplacement}
      <Flex gap="1rem">
        <Inventory2Icon />
        <div>Cargo</div>
        {totalCargo}
      </Flex>
      <Flex gap="1rem">
        <DeblurIcon />
        <div>Impulsion</div>
        {totalImpulsion}
      </Flex>
      <Flex gap="1rem">
        <SecurityIcon />
        <div>Shield</div>
        {totalShield}
      </Flex>
      <Flex gap="1rem">
        <RocketLaunchIcon />
        <div>Warp</div>
        {totalWarp}
      </Flex>
      <Flex gap="1rem">
        <BatteryCharging80Icon />
        <div>Fuel</div>
        {totalFuel}
      </Flex>
      <Flex gap="1rem">
        <FavoriteIcon />
        <div>Coque</div>
        {totalCoque}
      </Flex>
      <Flex gap="1rem">
        <LocalGasStationIcon />
        <div>Conso</div>
        {totalConso}
      </Flex>
      <BlueButton
        disabled={modulesEmplacement > currentShip.emplacement}
        onClick={onSubmit}
      >
        Créer
      </BlueButton>
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
                    <>
                      <img src={module.img} height={40} width={40} />
                      <p>{module.name}</p>
                      <i>{module.description}</i>
                      <Button
                        onClick={() => {
                          setSelectedModules([...selectedModules, module])
                        }}
                      >
                        Ajouter
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedModules(
                            selectedModules.filter(
                              (m) => m.name !== module.name,
                            ),
                          )
                        }}
                      >
                        Retirer
                      </Button>
                    </>
                  ))}
              </>
            ),
          }
        })}
      />
    </>
  )
}

export default ShipBuilder
