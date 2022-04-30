import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"
import _ from "lodash"
// app:javascript:app:page:universe:Universe.tsx
const debug = Debug("app:javascript:app:page:universe:Universe")
debug.log = console.log.bind(console)

const UniverseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(99, 1fr);
  column-gap: 0px;
  width: fit-content;
`
const Square = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid blue;
  cursor: pointer;
  &:hover {
    background-color: var(--blue300);
  }
`

const GridColumn = styled.div``

const universeGrid = new Array(99).fill(new Array(99).fill(0))

const Universe = ({}) => {
  const [currentSystemHovered, setcurrentSystemHovered] = useState(undefined)
  return (
    <>
      <div>Systeme : {currentSystemHovered}</div>
      {/* @ts-ignore */}
      <Universe2 setcurrentSystemHovered={setcurrentSystemHovered} />
    </>
  )
}
// @ts-ignore
const Universe2 = React.memo(({ setcurrentSystemHovered }) => {
  return (
    <UniverseContainer>
      {universeGrid.map((universeColumn, indexColumn) => (
        <GridColumn>
          {universeColumn.map((universeCell, indexCell) => (
            <div>
              <Square
                onMouseEnter={() =>
                  setcurrentSystemHovered(`${indexCell}${indexColumn}`)
                }
              />
            </div>
          ))}
        </GridColumn>
      ))}
    </UniverseContainer>
  )
})
React.memo(Universe2)

export default Universe
