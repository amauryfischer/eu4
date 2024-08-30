"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import _ from "lodash";
import usePlanets from "@/hooks/data/entity/use-planets.hook";
import BButton from "@/ui/atoms/buttons/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UniverseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(99, 1fr);
  column-gap: 0px;
  width: fit-content;
`;
const Square = styled.div`
  width: 15px !important;
  height: 15px !important;
  border: 0.1px solid blue;
  cursor: pointer;
  &:hover {
    background-color: var(--blue300);
  }
`;

const GridColumn = styled.div``;

const universeGrid = new Array(80).fill(new Array(50).fill(0));

const Universe = () => {
	const [currentSystemHovered, setcurrentSystemHovered] = useState(undefined);
	return (
		<>
			<div>Systeme : {currentSystemHovered}</div>
			{/* @ts-ignore */}
			<Universe2 setcurrentSystemHovered={setcurrentSystemHovered} />
		</>
	);
};
// @ts-ignore
const Universe2 = React.memo(({ setcurrentSystemHovered }) => {
	const planets = usePlanets();
	const { push } = useRouter();
	if (!planets) return <>no data</>;
	const currentPlanet = Object.values(planets)[0];

	return (
		<UniverseContainer>
			<BButton
				$color="blue"
				as={Link}
				href={`/system/${currentPlanet?.position?.system}`}
			>
				Univers {currentPlanet?.position?.system}
			</BButton>
			{universeGrid.map((universeColumn, indexColumn) => (
				<GridColumn>
					{universeColumn.map((universeCell: any, indexCell: any) => {
						let prefixUniverseCell = "";
						let prefixUniverseColumn = "";
						if (indexCell < 10) {
							prefixUniverseCell = "0";
						}
						if (indexColumn < 10) {
							prefixUniverseColumn = "0";
						}
						return (
							<Square
								key={`${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`}
								onMouseEnter={() =>
									setcurrentSystemHovered(
										`${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`,
									)
								}
								onClick={() =>
									push(
										`/system/${prefixUniverseCell}${indexCell}${prefixUniverseColumn}${indexColumn}`,
									)
								}
							/>
						);
					})}
				</GridColumn>
			))}
		</UniverseContainer>
	);
});
React.memo(Universe2);

export default Universe;
