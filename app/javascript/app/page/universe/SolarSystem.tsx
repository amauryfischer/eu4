import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import _ from "lodash"
import { useNavigate, useParams } from "react-router"
import ParcelService from "services/ParcelService"
import ShipService from "services/ShipService"
import useShips from "hooks/useShips"
// app:javascript:app:page:universe:Universe.tsx
const debug = Debug("app:javascript:app:page:universe:Universe")
debug.log = console.log.bind(console)

const UniverseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(99, 1fr);
  column-gap: 0px;
  width: fit-content;
`
const Sun = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid var(--yellow500);
  background-color: yellow;
  border-radius: 4rem;
`
const Square = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid blue;
  cursor: ${({ $entity }) => ($entity ? "pointer" : "default")};
  ${({ $entity }) => {
    switch ($entity) {
      case "planet":
        return css`
          background-color: var(--purple400);
          border-radius: 4rem;
          border: 1px solid var(--purple900);
        `
    }
  }}
`
const StyledImgContainer = styled.div`
  display: flex;
  height: 15px;
  width: 15px;
  border: 1px solid white;
  cursor: pointer;
`
const GridColumn = styled.div``

const universeGrid = new Array(99).fill(new Array(99).fill(0))

const SolarSystem = ({}) => {
  const [currentSystemHovered, setcurrentSystemHovered] = useState(undefined)
  const { id } = useParams()
  return (
    <>
      <div>
        Systeme : {id}. X : {currentSystemHovered?.[0]}
        {currentSystemHovered?.[1]} Y : {currentSystemHovered?.[2]}
        {currentSystemHovered?.[3]}
      </div>
      {/* @ts-ignore */}
      <SolarSystem2 setcurrentSystemHovered={setcurrentSystemHovered} />
    </>
  )
}
// @ts-ignore
const SolarSystem2 = React.memo(({ setcurrentSystemHovered }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [fleets, setFleets] = useState(undefined)
  const [planets, setPlanets] = useState(undefined)
  const ships = useShips()
  useEffect(() => {
    const fetch = async () => {
      const response = await ParcelService.getParcelDetails(id)
      setFleets(response.data.fleets)
      setPlanets(response.data.planets)
    }
    fetch()
  }, [])
  return (
    <UniverseContainer>
      {universeGrid.map((universeColumn, indexColumn) => (
        <GridColumn>
          {universeColumn.map((universeCell, indexCell) => {
            if (indexCell == 50 && indexColumn == 50) {
              return <Sun />
            }
            let prefixUniverseCell = ""
            let prefixUniverseColumn = ""
            if (indexCell < 10) {
              prefixUniverseCell = "0"
            }
            if (indexColumn < 10) {
              prefixUniverseColumn = "0"
            }
            let entity = undefined
            let entityType = undefined
            const fleetMap = fleets ?? []
            fleetMap.forEach((fleet) => {
              if (
                parseInt(fleet.data.position.systemPosition.x) === indexCell &&
                parseInt(fleet.data.position.systemPosition.y) === indexColumn
              ) {
                entityType = "fleet"
                entity = fleet
              }
            })
            const planetMap = planets ?? []
            planetMap.forEach((planet) => {
              if (
                planet.data.position.systemPosition.x === indexCell &&
                planet.data.position.systemPosition.y === indexColumn
              ) {
                entityType = "planet"
              }
            })
            if (entityType === "fleet") {
              const shipId = entity.data.shipIds[0]
              const shipImg =
                ShipService.getAllShips()[ships?.[shipId]?.data?.class]?.img
              return (
                <StyledImgContainer>
                  <img
                    src={shipImg}
                    width={15}
                    height={15}
                    onClick={() => {
                      navigate(`/fleets/manager/${entity.id}`)
                    }}
                  />
                </StyledImgContainer>
              )
            }
            return (
              <div
                key={`${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`}
              >
                <Square
                  $entity={entityType}
                  onMouseEnter={() =>
                    setcurrentSystemHovered(
                      `${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`,
                    )
                  }
                  onClick={() => {
                    // if (entity === "fleet") {
                    //   navigate(`/fleets/manager/${entity.id}`)
                    // }
                  }}
                />
              </div>
            )
          })}
        </GridColumn>
      ))}
    </UniverseContainer>
  )
})
React.memo(SolarSystem2)

export default SolarSystem
