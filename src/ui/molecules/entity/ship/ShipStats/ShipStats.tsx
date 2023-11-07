import ShipService from "@/services/ShipService"
import { IModifier } from "@/type/data/IModule"
import IShip from "@/type/data/IShip"
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80"
import BuildIcon from "@mui/icons-material/Build"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import DeblurIcon from "@mui/icons-material/Deblur"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import SecurityIcon from "@mui/icons-material/Security"
import Flex from "@/ui/atoms/Flex"
import { useMemo } from "react"
import styled from "styled-components"

const ShipPropertyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15fr);
  column-gap: 2em;
  row-gap: 1em;
`

const ShipStats = ({ ship }: { ship: IShip }) => {
	const shipClass = ShipService.getAllShips()[ship.class]

	const totalStat = useMemo(() => {
		const totalStatTmp = {
			cargo: 0,
			impulsion: 0,
			shield: 0,
			warp: 0,
			fuel: shipClass.fuelSpace,
			coque: shipClass.fuelSpace,
			conso: 0,
		}
		ship.modules.forEach((m) => {
			if (m?.modifier) {
				Object.keys(m.modifier).forEach((mod) => {
					if (mod === IModifier.CARGO) {
						totalStatTmp.cargo += m.modifier?.[mod] ?? 0
					}
					if (mod === IModifier.IMPULSION) {
						totalStatTmp.impulsion +=
							(m.modifier?.[mod] ?? 0) * (shipClass?.multiplier?.impulse ?? 0)
					}
					if (mod === IModifier.SHIELD) {
						totalStatTmp.shield += m.modifier?.[mod] ?? 0
					}
					if (mod === IModifier.WARP) {
						totalStatTmp.warp +=
							(m.modifier?.[mod] ?? 0) * (shipClass?.multiplier?.warp ?? 0)
					}
					if (mod === IModifier.FUEL) {
						totalStatTmp.fuel += m.modifier?.[mod] ?? 0
					}
					if (mod === IModifier.COQUE) {
						totalStatTmp.coque += m.modifier?.[mod] ?? 0
					}
					if (mod === IModifier.CONSO) {
						totalStatTmp.conso +=
							(m.modifier?.[mod] ?? 0) * (shipClass?.multiplier?.conso ?? 0)
					}
				})
			}
		})
		return totalStatTmp
	}, [ship])

	return (
		<Flex direction="column" gap="0.25rem">
			{[
				{
					name: "Cargo",
					icon: <Inventory2Icon />,
					totalAmount: totalStat.cargo,
				},
				{
					name: "Impulsion",
					icon: <DeblurIcon />,
					totalAmount: totalStat.impulsion,
				},
				{
					name: "Shield",
					icon: <SecurityIcon />,
					totalAmount: totalStat.shield,
				},
				{
					name: "Warp",
					icon: <RocketLaunchIcon />,
					totalAmount: totalStat.warp,
				},
				{
					name: "Fuel",
					icon: <BatteryCharging80Icon />,
					totalAmount: totalStat.fuel,
				},
				{
					name: "Coque",
					icon: <FavoriteIcon />,
					totalAmount: totalStat.coque,
				},
				{
					name: "Conso",
					icon: <LocalGasStationIcon />,
					totalAmount: totalStat.conso,
				},
			].map((shipProperty) => (
				<ShipPropertyContainer>
					<Flex gap="0.5rem">
						<div>{shipProperty.icon}</div>
						<div>{shipProperty.name}</div>
					</Flex>
					<div>{shipProperty.totalAmount}</div>
				</ShipPropertyContainer>
			))}
		</Flex>
	)
}

export default ShipStats
