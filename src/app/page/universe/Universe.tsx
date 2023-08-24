import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled, { css } from "styled-components"
import _ from "lodash"
import { useNavigate } from "react-router"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import BButton from "@/ui/atoms/buttons/BButton"

const UniverseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(99, 1fr);
  column-gap: 0px;
  width: fit-content;
`
const Square = styled.div`
  width: 15px !important;
  height: 15px !important;
  border: 0.1px solid blue;
  cursor: pointer;
  &:hover {
    background-color: var(--blue300);
  }
`

const GridColumn = styled.div``

const universeGrid = new Array(80).fill(new Array(50).fill(0))

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
	const navigate = useNavigate()
	const planets = usePlanets()
	if (!planets) return null
	const currentPlanet = Object.values(planets)[0]

	return (
		<UniverseContainer>
			<BButton
				$color="blue"
				onClick={() => {
					navigate(`/system/${currentPlanet?.position?.system}`)
				}}
			>
				Univers {currentPlanet?.position?.system}
			</BButton>
			{universeGrid.map((universeColumn, indexColumn) => (
				<GridColumn>
					{universeColumn.map((universeCell: any, indexCell: any) => {
						let prefixUniverseCell = ""
						let prefixUniverseColumn = ""
						if (indexCell < 10) {
							prefixUniverseCell = "0"
						}
						if (indexColumn < 10) {
							prefixUniverseColumn = "0"
						}
						return (
							<div
								key={`${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`}
							>
								<Square
									onMouseEnter={() =>
										setcurrentSystemHovered(
											`${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`,
										)
									}
									onClick={() =>
										navigate(
											`/system/${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`,
										)
									}
								/>
							</div>
						)
					})}
				</GridColumn>
			))}
		</UniverseContainer>
	)
})
React.memo(Universe2)

export default Universe
