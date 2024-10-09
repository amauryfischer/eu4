"use client"
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import IShipDesign from "@/type/data/IShipDesign"
import Flex from "@/ui/atoms/Flex"
import BModal from "@/ui/molecules/modal/BModal"
import {
	Chip,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip
} from "@nextui-org/react"
import { useState } from "react"
import styled from "styled-components"
import PlanetShipFactory from "./buildings/PlanetShipFactory"
import PlanetSpatioport from "./buildings/PlanetSpatioport"
import ShipBuilder from "./buildings/shipBuilder/ShipBuilder"
import { useParams } from "next/navigation"
import PlanetResearch from "./buildings/PlanetResearch"
import PlanetMines from "./buildings/PlanetMines"
import PlanetCommunication from "./buildings/PlanetCommunication"
import { BUILDING_TYPE } from "@/type/data/IPlanet"
import Button from "@/ui/atoms/buttons/Button"
import { setCurrentUpgradeBuilding } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import getAllBuildings from "@/utils/allBuildings"
const Simg = styled.img<{
	$disabled?: boolean
	$width: number
	$height: number
	$row: number
	$percentage: number
}>`
	transition: all 0.3s ease-in-out;
	filter: drop-shadow(5px 2px 2px #a0a0a0);
	${({ $width, $height }) => `
		width: ${$width}vw;
		height: ${$height}vw;
	`}
	&:hover {
		cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
		transform: translateY(-5px);
	}
	position: absolute;
	${({ $row }) => {
		switch ($row) {
			case 1:
				return `
					top: 10%;
				`
			case 2:
				return `
					top: 40%;
				`
			case 3:
				return `
					top: 70%;
				`
		}
	}}
	${({ $percentage }) => {
		return `
			left: ${$percentage}%;
		`
	}}
`

export const BackgroundImage = styled.div<{
	$backgroundImage: string | undefined
}>`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  z-index: -100;
  filter: blur(1px) brightness(0.2) opacity(0.5);
`
const SFlex = styled(Flex)<{ $url: string }>`
	background: url(${({ $url }) => $url}) no-repeat center center fixed;	
	background-size: cover;
	min-height: calc(100vh - var(--topbar-height));
	position: relative;
	padding: 2rem;
`

const PlanetMain = () => {
	const { id: planetId } = useParams()
	const currentPlanet = useCurrentPlayerActivePlanet()
	const [isOpen, setIsOpen] = useState<string | undefined>(undefined)
	const [shipSelected, setShipSelected] = useState<IShipDesign | undefined>(
		undefined
	)
	const dispatch = useDispatch<AppDispatch>()
	const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
		undefined
	)
	const allBuildings = getAllBuildings(planetId)
	const urlType = {
		mars: "/images/backgrounds/mars.webp",
		fictio: "/images/backgrounds/fictio.png",
		moon: "/images/backgrounds/moon.jpeg",
		ceres: "/images/backgrounds/ceres.png",
		eris: "/images/backgrounds/eris.png",
		haumea: "/images/backgrounds/haumea.png",
		venus: "/images/backgrounds/venus.png",
		saturn: "/images/backgrounds/saturn.png",
		atmo: "/images/backgrounds/atmo.png",
		uranus: "/images/backgrounds/uranus.png"
	}
	return (
		<>
			<SFlex gap="2rem" wrap="wrap" $url={urlType[currentPlanet?.type]}>
				{allBuildings.map(
					({ name, src, link, disabled, width, height, row, percentage }) => (
						<Tooltip
							hidden={disabled}
							key={name}
							content={
								<div className="flex flex-col gap-6 p-4">
									<div className="flex justify-between gap-8">
										<div className="text-xl capitalize">{name}</div>
										<Chip color="primary" variant="bordered">
											Niveau{" "}
											{
												currentPlanet?.buildingLevel?.[
													allBuildings.find((b) => b.name === name)?.type
												]
											}
										</Chip>
									</div>
									<Button
										variant="bordered"
										color="cyan"
										onClick={() => {
											if (!disabled) {
												dispatch(
													setCurrentUpgradeBuilding(
														allBuildings.find((b) => b.name === name)?.type
													)
												)
											}
										}}
									>
										Passer au niveau{" "}
										{currentPlanet?.buildingLevel?.[
											allBuildings.find((b) => b.name === name)?.type
										] + 1}
									</Button>
								</div>
							}
						>
							<Simg
								key={name}
								alt={name}
								src={src}
								$width={width ?? 200}
								$height={height ?? 200}
								onClick={() => setIsOpen(name)}
								$disabled={disabled}
								$row={row}
								$percentage={percentage}
							/>
						</Tooltip>
					)
				)}
			</SFlex>
			<BModal
				isOpen={!!isOpen}
				onClose={() => setIsOpen(undefined)}
				title={isOpen}
			>
				<ModalContent className="relative">
					<BackgroundImage $backgroundImage={backgroundImage} />
					<ModalHeader>
						<div className="flex items-center gap-2 w-full justify-between pr-4">
							<div className="text-3xl">{isOpen}</div>
						</div>
					</ModalHeader>
					<ModalBody className="max-h-[70vh] overflow-y-auto">
						{
							{
								Manufacture: (
									<PlanetShipFactory
										onSelectShip={(shipSelected) => {
											setShipSelected(shipSelected)
											setIsOpen("ShipBuilder")
										}}
									/>
								),
								ShipBuilder: (
									<ShipBuilder
										shipSelected={shipSelected}
										setIsOpen={setIsOpen}
										setBackgroundImage={setBackgroundImage}
									/>
								),
								Hangar: <PlanetSpatioport />,
								"Centre de recherche": <PlanetResearch />,
								Mine: <PlanetMines />,
								"Centre de communication": <PlanetCommunication />
							}[isOpen]
						}
					</ModalBody>
				</ModalContent>
			</BModal>
		</>
	)
}

export default PlanetMain
