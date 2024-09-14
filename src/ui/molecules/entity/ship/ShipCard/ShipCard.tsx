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
import { Tooltip } from "@nextui-org/react"

const ShipCard = ({
	ship,
	onClick
}: {
	ship: IShipDesign
	onClick: () => void
}) => {
	return (
		<SCard isPressable onClick={onClick}>
			<div className="w-full grid grid-cols-4">
				<CardImageContainer>
					<CardImage
						src={ship.img}
						alt="Relaxing app background"
						height="80px"
					/>
				</CardImageContainer>
				<div className="flex flex-col justify-center items-center">
					<div className="text-4xl font-semibold align-self-center">
						{ship.name}
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="text-3xl font-semibold align-self-center">
						{ship.emplacement}
					</div>
					<div className="text-default-300 text-xs  align-self-center">
						Emplacement
					</div>
				</div>
				<Flex
					justifyContent="center"
					fullWidth
					gap="1rem"
					alignItems="center"
					className="w-full"
				>
					<GridResources>
						{[
							{
								name: "Impulsion multiplicateur",
								icon: <DeblurIcon />,
								totalAmount: ship.multiplier.impulse
							},
							{
								name: "Warp multiplicateur",
								icon: <RocketLaunchIcon />,
								totalAmount: ship.multiplier.warp ?? 0
							},
							{
								name: "Bouclier multiplicateur",
								icon: <SecurityIcon />,
								totalAmount: ship.multiplier.shield ?? 0
							},

							{
								name: "Consommation multiplicateur",
								icon: <LocalGasStationIcon />,
								totalAmount: ship.multiplier.conso ?? 0
							},
							{
								name: "Base Coque",
								icon: <FavoriteIcon />,
								totalAmount: ship.baseCoque
							}
						].map((shipProperty, index) => (
							<>
								<Tooltip content={shipProperty.name} key={index}>
									<div className="text-white">{shipProperty.icon}</div>
								</Tooltip>
								<div className="text-white">{shipProperty.totalAmount}</div>
							</>
						))}
					</GridResources>
				</Flex>
			</div>
		</SCard>
	)
}

export default ShipCard
