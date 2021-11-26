import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import ShipService from "services/ShipService"
import _ from "lodash"
import CustomTabs from "components/CustomTabs"
import ModulesService, { IModuleType } from "services/ModulesService"
import IModule from "app/javascript/app/type/IModule"
import { Button } from "@mui/material"
import { PrimaryButton } from "styles/button"
import { createShip } from "reducer/ships/shipResource"
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
  return (
    <>
      <img src={currentShip.img} height={40} width={40} />
      Emplacements : {modulesEmplacement} / {currentShip.emplacement}
      <PrimaryButton
        disabled={modulesEmplacement > currentShip.emplacement}
        onClick={onSubmit}
      >
        Créer
      </PrimaryButton>
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
