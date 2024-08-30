import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import DeblurIcon from "@mui/icons-material/Deblur"
import FavoriteIcon from "@mui/icons-material/Favorite"
import React from "react"
import {
	CardContent,
	CardImage,
	CardImageContainer,
	DisplayResourcesContainer,
	EditionText,
	ExtendedCard,
	GridCardContent,
	GridResources,
	SCard,
	SDiv,
	ShipClass,
	ShipTitle,
	ShipVariantTitle,
} from "./ShipCard.styled"

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import SecurityIcon from "@mui/icons-material/Security"
import { RESOURCE_TYPES } from "@/services/ResourcesService"
import IShipDesign from "@/type/data/IShipDesign"
import Flex from "@/ui/atoms/Flex/Flex"
import DisplaySingleResource from "../../resources/DisplaySingleResource/DisplaySingleResource"
import Sell from "@/ui/fondations/icons/Sell"
import BuyIconButton from "@/ui/atoms/iconButtons/BuyIconButton"
import Button from "@/ui/atoms/buttons/Button"

const ShipCard = ({
	ship,
	onClick,
}: {
	ship: IShipDesign
	onClick: () => void
}) => {
	const [version, setVersion] = React.useState(0)
	const color = {
		0: "white",
		1: "emerald",
		2: "cyan",
		3: "purple",
	}[version]
	return (
		<SCard
			$color={
				{
					0: "white",
					1: "emerald700",
					2: "cyan700",
					3: "purple700",
				}[version]
			}
		>
			<Flex fullWidth fullHeight>
				<GridCardContent>
					<CardImageContainer>
						<CardImage
							src={ship.img}
							width="100%"
							height="100%"
							alt="Relaxing app background"
						/>
						<EditionText
							$textColor={
								{
									0: "white",
									1: "emerald200",
									2: "cyan200",
									3: "purple200",
								}[version]
							}
						>
							{version > 0 ? (
								<Button
									color={color}
									variant="bordered"
									isIconOnly
									startContent={<ArrowLeftIcon fontSize="small" />}
									onClick={() => setVersion((version - 1) % 4)}
									size="sm"
								/>
							) : (
								<SDiv />
							)}
							{version === 0 && (
								<ShipVariantTitle color={color}>
									Edition standard
								</ShipVariantTitle>
							)}
							{version === 1 && (
								<ShipVariantTitle color={color}>
									Edition transport
								</ShipVariantTitle>
							)}
							{version === 2 && (
								<ShipVariantTitle color={color}>
									Edition armement
								</ShipVariantTitle>
							)}
							{version === 3 && (
								<ShipVariantTitle color={color}>Edition tank</ShipVariantTitle>
							)}
							{version < 3 ? (
								<Button
									variant="bordered"
									size="sm"
									color={
										{
											0: "white",
											1: "emerald200",
											2: "cyan200",
											3: "purple200",
										}[version]
									}
									isIconOnly
									startContent={<ArrowRightIcon fontSize="small" />}
									onClick={() => setVersion((version + 1) % 4)}
								/>
							) : (
								<SDiv />
							)}
						</EditionText>
					</CardImageContainer>
					<CardContent>
						<Flex
							justifyContent="space-between"
							fullWidth
							gap="1rem"
							alignItems="center"
						>
							<Flex direction="column">
								<ShipTitle
									$textColor={
										{
											0: "white",
											1: "emerald300",
											2: "cyan300",
											3: "purple300",
										}[version] as string
									}
								>
									{ship.name}
								</ShipTitle>
								<ShipClass
									$textColor={
										{
											0: "white",
											1: "emerald100",
											2: "cyan100",
											3: "purple300",
										}[version] as string
									}
								>
									A - Chasseur
								</ShipClass>
							</Flex>
							<GridResources>
								{[
									{
										name: "Impulsion multi",
										icon: <DeblurIcon fontSize="small" />,
										totalAmount: ship.multiplier.impulse,
									},
									{
										name: "Bouclier multi",
										icon: <SecurityIcon fontSize="small" />,
										totalAmount: ship.multiplier.shield ?? 0,
									},
									{
										name: "Warp multi",
										icon: <RocketLaunchIcon fontSize="small" />,
										totalAmount: ship.multiplier.warp ?? 0,
									},
									{
										name: "Consommation multi",
										icon: <LocalGasStationIcon fontSize="small" />,
										totalAmount: ship.multiplier.conso ?? 0,
									},
									{
										name: "Base Coque",
										icon: <FavoriteIcon fontSize="small" />,
										totalAmount: ship.baseCoque,
									},
								].map((shipProperty) => (
									<>
										<div className="text-white">{shipProperty.icon}</div>
										<div className="text-white">{shipProperty.totalAmount}</div>
										{/* <div>{shipProperty.name}</div> */}
									</>
								))}
							</GridResources>
						</Flex>
					</CardContent>
				</GridCardContent>
				<ExtendedCard>
					<Flex
						direction="column"
						justifyContent="space-between"
						fullHeight
						alignItems="center"
					>
						<DisplayResourcesContainer>
							{Object.entries(ship.cost ?? {}).map(
								([resource, cost]: [string, number]) => (
									<DisplaySingleResource
										key={resource}
										resource={resource as RESOURCE_TYPES}
										cost={cost}
									/>
								),
							)}
						</DisplayResourcesContainer>
						<BuyIconButton
							onPress={onClick}
							color={
								{
									0: "white",
									1: "emerald",
									2: "cyan",
									3: "purple",
								}[version]
							}
						/>
					</Flex>
				</ExtendedCard>
			</Flex>
		</SCard>
	)
}

export default ShipCard
