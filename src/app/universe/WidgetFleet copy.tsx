import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { keyframes, css } from "styled-components"
import Moment from "moment"
import { useNavigate } from "react-router-dom"
import _ from "lodash"
import { SQUARE_HEIGHT } from "./SolarSystem"
import ShipService from "services/ShipService"
import useShips from "hooks/useShips"
import { IFleet } from "type/IFleet"
import { PinkButton, PurpleButton } from "styles/SButton"
import Flex from "styles/Flex"
import { Avatar } from "@nextui-org/react"
// app:javascript:app:page:universe:WidgetFleet.tsx
const debug = Debug("app:javascript:app:page:universe:WidgetFleet.tsx")
debug.log = console.log.bind(console)

const StyledImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${SQUARE_HEIGHT}px;
  width: ${SQUARE_HEIGHT}px;
  border: 1px solid white;
  cursor: pointer;
  max-width: ${SQUARE_HEIGHT}px;
  max-height: ${SQUARE_HEIGHT}px;
  overflow: hidden;
  &:hover {
    transition: height 0.2s ease-in-out, width 0.8s ease-in-out;
    position: absolute;
    width: 350px;
    max-width: 350px;
    height: ${SQUARE_HEIGHT * 7}px;
    max-height: ${SQUARE_HEIGHT * 7}px;
    overflow: visible;
    background-color: var(--grey900);
  }
`

const StyledImage = styled.img<{ mouseHover: boolean }>`
  height: ${SQUARE_HEIGHT}px;
  width: ${SQUARE_HEIGHT}px;
  max-width: ${SQUARE_HEIGHT}px;
  max-height: ${SQUARE_HEIGHT}px;
  overflow: hidden;
  ${({ mouseHover }) =>
		mouseHover &&
		css`
      transition: all 0.2s ease-in-out;
      height: ${SQUARE_HEIGHT * 7}px;
      width: ${SQUARE_HEIGHT * 7}px;
      max-width: ${SQUARE_HEIGHT * 7}px;
      max-height: ${SQUARE_HEIGHT * 7}px;
      overflow: visible;
    `}
`
const FlexContainer = styled(Flex)`
  width: 100%;
  transition: width 0.2s;
  overflow: hidden;
`

interface IWidgetFleet {
	fleet: IFleet
	setSelectedFleet: (fleet: IFleet) => void
}
const WidgetFleet = ({ fleet, setSelectedFleet }: IWidgetFleet) => {
	const navigate = useNavigate()
	const ships = useShips()
	const [isMouseHover, setIsMouseHover] = useState(false)
	const shipId = fleet.data.shipIds[0]
	const shipImg = ShipService.getAllShips()[ships?.[shipId]?.data?.class]?.img

	return (
		<div
			style={{ position: "relative" }}
			onMouseEnter={() => setIsMouseHover(true)}
			onMouseLeave={() => setIsMouseHover(false)}
		>
			<StyledImgContainer>
				<StyledImage
					mouseHover={isMouseHover}
					src={shipImg}
					width={SQUARE_HEIGHT}
					height={SQUARE_HEIGHT}
					onClick={() => setSelectedFleet(fleet)}
				/>
				{isMouseHover && (
					<FlexContainer gap="0.5rem" fullWidth direction="column">
						<div>{fleet.data.name}</div>
						<PurpleButton onClick={() => setSelectedFleet(fleet)}>
							Gérer la flotte
						</PurpleButton>
					</FlexContainer>
				)}
			</StyledImgContainer>
		</div>
	)
}

export default WidgetFleet
