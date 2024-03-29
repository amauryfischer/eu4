import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import { setCurrentPlanet } from "@/redux/slice/current.slice"
import Flex from "@/ui/atoms/Flex"
import BButton from "@/ui/atoms/buttons/BButton"
import GalaxyButton from "@/ui/atoms/buttons/GalaxyButton/GalaxyButton"
import BModal from "@/ui/molecules/modal/BModal"
import { ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import styled from "styled-components"
import PlanetShipFactory from "./buildings/PlanetShipFactory"
import IShipDesign from "@/type/data/IShipDesign"
import ShipBuilder from "./buildings/shipBuilder/ShipBuilder"
import PlanetSpatioport from "./buildings/PlanetSpatioport"
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
const SFlex = styled(Flex)<{ $url: string }>`
	background: url(${({ $url }) => $url}) no-repeat center center fixed;	
	background-size: cover;
	min-height: calc(100vh - var(--topbar-height));
	position: relative;
	padding: 2rem;
`
const PlanetMain = ({}) => {
	const { id: planetId } = useParams()
	const navigate = useNavigate()
	const currentPlanet = useCurrentPlayerActivePlanet()
	const [isOpen, setIsOpen] = useState<string | undefined>(undefined)
	const [shipSelected, setShipSelected] = useState<IShipDesign | undefined>(
		undefined,
	)
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
		uranus: "/images/backgrounds/uranus.png",
	}
	return (
		<>
			<SFlex gap="2rem" wrap="wrap" $url={urlType[currentPlanet?.type]}>
				{[
					{
						name: "Centre de recherche",
						src: "/images/buildings/research.png",
						link: `/planets/${planetId}/research`,
						width: 8,
						height: 8,
						row: 1,
						percentage: 12,
					},
					{
						name: "Usine",
						src: "/images/buildings/usine.png",
						link: `/planets/${planetId}/research`,
						disabled: true,
						width: 10,
						height: 10,
						row: 1,
						percentage: 58,
					},
					{
						name: "Centre de communication",
						src: "/images/buildings/communication.png",
						link: `/planets/${planetId}/research`,
						disabled: true,
						width: 12,
						height: 12,
						row: 2,
						percentage: 34,
					},
					{
						name: "Mine",
						src: "/images/buildings/mine.webp",
						link: `/planets/${planetId}/research`,
						disabled: true,
						width: 15,
						height: 15,
						row: 2,
						percentage: 60,
					},
					{
						name: "Hangar",
						src: "/images/buildings/hangar.webp",
						link: `/planets/${planetId}/spatioport`,
						width: 10,
						height: 8,
						row: 2,
						persentage: 85,
					},
					{
						name: "Manufacture",
						src: "/images/buildings/manufacturing.webp",
						link: `/planets/${planetId}/shipfactory/choose`,
						width: 13,
						height: 10,
						row: 3,
						percentage: 21,
					},
					{
						name: "Université",
						src: "/images/buildings/university.webp",
						link: `/planets/${planetId}/research`,
						disabled: true,
						width: 8,
						height: 10,
						row: 3,
						percentage: 78,
					},
				].map(
					({ name, src, link, disabled, width, height, row, percentage }) => (
						<Simg
							alt={name}
							src={src}
							$width={width ?? 200}
							$height={height ?? 200}
							onClick={() => setIsOpen(name)}
							$disabled={disabled}
							$row={row}
							$percentage={percentage}
						/>
					),
				)}
			</SFlex>
			<BModal
				size="5xl"
				isOpen={!!isOpen}
				onClose={() => setIsOpen(undefined)}
				title={isOpen}
				scrollBehavior="inside"
			>
				<ModalContent>
					<ModalHeader>{isOpen}</ModalHeader>
					<ModalBody>
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
								ShipBuilder: <ShipBuilder shipSelected={shipSelected} />,
								Hangar: <PlanetSpatioport />,
							}[isOpen]
						}
					</ModalBody>
				</ModalContent>
			</BModal>
		</>
	)
}

export default PlanetMain
