import DeblurIcon from "@mui/icons-material/Deblur"
import _ from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom"
import ModulesService, { IModuleType } from "@/services/ModulesService"
import ShipService from "@/services/ShipService"
import styled from "styled-components"

import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80"
import BuildIcon from "@mui/icons-material/Build"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import SecurityIcon from "@mui/icons-material/Security"
import { Avatar, Input, Tab, Tabs } from "@nextui-org/react"
import ResourcesService, {
	ALUMINUM,
	AZOTE,
	CUIVRE,
	FER,
	HYDROGENE,
	SILICIUM,
	TITANE,
	URANIUM,
} from "@/services/ResourcesService"
import ModuleShipBuilder from "./ModuleShipBuilder"
import { IModifier, IModule } from "@/type/data/IModule"
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook"
import Flex from "@/ui/atoms/Flex/Flex"
import BButton from "@/ui/atoms/buttons/BButton/BButton"

const Container = styled.div<{}>`
  padding: 2rem;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow: hidden;
`

const BackgroundImage = styled.div<{
	img: string
}>`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.img});
  background-size: cover;
  z-index: -100;
  filter: blur(10px) brightness(0.3) contrast(1.3);
`

const ShipPropertyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15fr);
  column-gap: 2em;
`
const SAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`
const ShipBuilder = ({}) => {
	const { shipClass } = useParams()
	const currentShipClass = ShipService.getAllShips()[shipClass as string]
	const modules = Object.values(ModulesService.getAllModules())
	const [selectedModules, setSelectedModules] = useState<IModule[]>([])
	const [shipName, setShipName] = useState("")
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { createShip } = useShipsActions()
	const modulesEmplacement = _.sumBy(selectedModules, (m) => m.emplacement)
	const onSubmit = () => {
		createShip({
			name: shipName,
			modules: selectedModules,
			class: shipClass,
		})
		navigate(`/planets/${id}`)
	}

	const totalStat = {
		cargo: 0,
		impulsion: 0,
		shield: 0,
		warp: 0,
		fuel: currentShipClass.fuelSpace,
		coque: currentShipClass.baseCoque,
		conso: 0,
	}
	const totalResources = {
		[TITANE.name]: currentShipClass?.cost?.[TITANE.name] || 0,
		[CUIVRE.name]: currentShipClass?.cost?.[CUIVRE.name] || 0,
		[FER.name]: currentShipClass?.cost?.[FER.name] || 0,
		[ALUMINUM.name]: currentShipClass?.cost?.[ALUMINUM.name] || 0,
		[SILICIUM.name]: currentShipClass?.cost?.[SILICIUM.name] || 0,
		[URANIUM.name]: currentShipClass?.cost?.[URANIUM.name] || 0,
		[AZOTE.name]: currentShipClass?.cost?.[AZOTE.name] || 0,
		[HYDROGENE.name]: currentShipClass?.cost?.[HYDROGENE.name] || 0,
	}

	selectedModules.forEach((m) => {
		if (m?.modifier) {
			Object.keys(m.modifier).forEach((mod) => {
				if (mod === IModifier.CARGO) {
					totalStat.cargo += m.modifier?.[mod] ?? 0
				}
				if (mod === IModifier.IMPULSION) {
					totalStat.impulsion +=
						(m.modifier?.[mod] ?? 0) *
						(currentShipClass?.multiplier?.impulse ?? 0)
				}
				if (mod === IModifier.SHIELD) {
					totalStat.shield += m.modifier?.[mod] ?? 0
				}
				if (mod === IModifier.WARP) {
					totalStat.warp +=
						(m.modifier?.[mod] ?? 0) * (currentShipClass?.multiplier?.warp ?? 0)
				}
				if (mod === IModifier.FUEL) {
					totalStat.fuel += m.modifier?.[mod] ?? 0
				}
				if (mod === IModifier.COQUE) {
					totalStat.coque += m.modifier?.[mod] ?? 0
				}
				if (mod === IModifier.CONSO) {
					totalStat.conso +=
						(m.modifier?.[mod] ?? 0) *
						(currentShipClass?.multiplier?.conso ?? 0)
				}
			})
		}

		Object.entries(m.cost ?? {}).map(([resourceName, resourceAmount]) => {
			totalResources[resourceName] += resourceAmount ?? 0
		})
	})
	const numberModulePerName: { [key: string]: number } = {}

	selectedModules.forEach((module) => {
		if (!numberModulePerName[module.id]) {
			numberModulePerName[module.id] = 0
		}
	})
	return (
		<Container>
			<BackgroundImage img={currentShipClass.img} />
			<Flex direction="column">
				<Flex gap="4rem">
					<SAvatar
						height={200}
						width={200}
						src={currentShipClass.img}
						squared
						bordered
					/>

					<Flex direction="column">
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
					<Flex direction="column">
						<div>
							Emplacements : {modulesEmplacement} /{" "}
							{currentShipClass.emplacement}
						</div>
						{Object.keys(numberModulePerName).map((moduleId) => (
							<Flex gap="0.5rem">
								<img
									src={ModulesService.getAllModules()[moduleId].img}
									width="25px"
								/>
								<div>
									{numberModulePerName[moduleId]} x{" "}
									{ModulesService.getAllModules()[moduleId].name}
								</div>
							</Flex>
						))}
					</Flex>
					<Flex direction="column">
						{Object.values(ResourcesService.getAllResources()).map(
							(resource) => (
								<ShipPropertyContainer>
									<img src={resource.img} height="25px" width="25px" />
									<div>{resource.name}</div>
									<div>{totalResources[resource.name]}</div>
								</ShipPropertyContainer>
							),
						)}
					</Flex>
					<Flex gap="1rem" align-items="center">
						<Input
							label="Nom du vaisseau"
							value={shipName}
							onChange={(e: any) => setShipName(e.target.value)}
						/>
						<BButton
							variant="bordered"
							color="primary"
							startContent={<BuildIcon />}
							disabled={modulesEmplacement > currentShipClass.emplacement}
							onClick={onSubmit}
						>
							Créer
						</BButton>
					</Flex>
				</Flex>
				<Tabs>
					{[
						{ label: "Moteurs", type: IModuleType.ENGINE },
						{ label: "Cargo", type: IModuleType.CARGO },
						{ label: "Armes", type: IModuleType.WEAPON },
						{ label: "Défense", type: IModuleType.DEFENSE },
						{ label: "Autre", type: IModuleType.OTHER },
					].map((category) => {
						return (
							<Tab key={category.label}>
								{modules
									.filter((m) => m.type === category.type)
									.map((module) => (
										<ModuleShipBuilder
											module={module}
											setSelectedModules={setSelectedModules}
											selectedModules={selectedModules}
										/>
									))}
							</Tab>
						)
					})}
				</Tabs>
			</Flex>
		</Container>
	)
}

export default ShipBuilder
