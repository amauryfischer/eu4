import ModulesService, { IModuleType } from "@/services/ModulesService"
import DeblurIcon from "@mui/icons-material/Deblur"
import _ from "lodash"
import React, { useState } from "react"

import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook"
import ResourcesService, {
	ALUMINUM,
	AZOTE,
	CUIVRE,
	FER,
	HYDROGENE,
	SILICIUM,
	TITANE,
	URANIUM
} from "@/services/ResourcesService"
import { IModifier, IModule } from "@/type/data/IModule"
import IShipDesign from "@/type/data/IShipDesign"
import Flex from "@/ui/atoms/Flex/Flex"
import BuildButton from "@/ui/atoms/buttons/BuildButton/BuildButton"
import BProgress from "@/ui/molecules/progress/BProgress"
import Defer from "@/utils/Defer"
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import SecurityIcon from "@mui/icons-material/Security"
import { Input, Spacer, Tab, Tabs } from "@nextui-org/react"
import ModuleShipBuilder from "./ModuleShipBuilder"
import {
	BackgroundImage,
	ColoredAvailableResource,
	Container,
	CustomGridResources,
	FullContainer,
	RedIfTooMuch,
	SAvatar,
	ShipPropertyContainer,
	Simg
} from "./ShipBuilder.styled"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { TaskType } from "@/type/data/ITask"
import moment from "moment"
import useCurrentUser from "@/hooks/current/use-current-user.hook"

const ShipBuilder = ({
	shipSelected,
	setIsOpen
}: {
	shipSelected: IShipDesign
	setIsOpen: (isOpen: string | undefined) => void
}) => {
	const currentShipClass = shipSelected
	const modules = Object.values(ModulesService.getAllModules())
	const [selectedModules, setSelectedModules] = useState<IModule[]>([])
	const [shipName, setShipName] = useState("")
	const currentPlayerActivePlanet = useCurrentPlayerActivePlanet()
	const user = useCurrentUser()
	const { createShip } = useShipsActions()
	const modulesEmplacement = _.sumBy(selectedModules, (m) => m.emplacement)
	const { createTask, fetchTasks } = useTasksActions()
	const onSubmit = () => {
		createTask({
			type: TaskType.BUILD_SHIP,
			endDate: moment().add(15, "seconds").toISOString(),
			userId: user.id,
			details: {
				name: shipName,
				modules: selectedModules,
				class: currentShipClass.class,
				planetId: currentPlayerActivePlanet.id
			}
		})
		fetchTasks()

		setIsOpen(undefined)
	}

	const totalStat = {
		cargo: 0,
		impulsion: 0,
		shield: 0,
		warp: 0,
		fuel: currentShipClass.fuelSpace,
		coque: currentShipClass.baseCoque,
		conso: 0
	}
	const totalResources = {
		[TITANE.name]: currentShipClass?.cost?.[TITANE.name] || 0,
		[CUIVRE.name]: currentShipClass?.cost?.[CUIVRE.name] || 0,
		[FER.name]: currentShipClass?.cost?.[FER.name] || 0,
		[ALUMINUM.name]: currentShipClass?.cost?.[ALUMINUM.name] || 0,
		[SILICIUM.name]: currentShipClass?.cost?.[SILICIUM.name] || 0,
		[URANIUM.name]: currentShipClass?.cost?.[URANIUM.name] || 0,
		[AZOTE.name]: currentShipClass?.cost?.[AZOTE.name] || 0,
		[HYDROGENE.name]: currentShipClass?.cost?.[HYDROGENE.name] || 0
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
		if (numberModulePerName[module.id]) {
			numberModulePerName[module.id] += 1
		} else {
			numberModulePerName[module.id] = 1
		}
	})
	return (
		<FullContainer>
			<BackgroundImage img={currentShipClass.img} />
			<Container>
				<Flex direction="column">
					<Flex gap="1rem" justifyContent="space-between">
						<SAvatar
							height={200}
							width={200}
							src={currentShipClass.img}
							squared
							bordered
							radius="md"
						/>

						<Flex direction="column" gap="0.25rem">
							{[
								{
									name: "Cargo",
									icon: <Inventory2Icon />,
									totalAmount: totalStat.cargo
								},
								{
									name: "Impulsion",
									icon: <DeblurIcon />,
									totalAmount: totalStat.impulsion
								},
								{
									name: "Shield",
									icon: <SecurityIcon />,
									totalAmount: totalStat.shield
								},
								{
									name: "Warp",
									icon: <RocketLaunchIcon />,
									totalAmount: totalStat.warp
								},
								{
									name: "Fuel",
									icon: <BatteryCharging80Icon />,
									totalAmount: totalStat.fuel
								},
								{
									name: "Coque",
									icon: <FavoriteIcon />,
									totalAmount: totalStat.coque
								},
								{
									name: "Conso",
									icon: <LocalGasStationIcon />,
									totalAmount: totalStat.conso
								}
							].map((shipProperty) => (
								<ShipPropertyContainer key={shipProperty.name}>
									<Flex gap="0.5rem">
										<div>{shipProperty.icon}</div>
										<div>{shipProperty.name}</div>
									</Flex>
									<div>{shipProperty.totalAmount}</div>
								</ShipPropertyContainer>
							))}
						</Flex>
						<Flex direction="column" gap="0.25rem">
							<RedIfTooMuch
								$tooMuch={modulesEmplacement > currentShipClass.emplacement}
							>
								Emplacements : {modulesEmplacement} /{" "}
								{currentShipClass.emplacement}
							</RedIfTooMuch>
							<BProgress
								value={
									(modulesEmplacement * 100) / currentShipClass.emplacement
								}
							/>
							{Object.keys(numberModulePerName).map((moduleId) => (
								<Flex align-items="center" gap="0.5rem" key={moduleId}>
									<Simg
										src={ModulesService.getAllModules()[moduleId].img}
										width="25px"
										height="25px"
									/>
									<div>
										{numberModulePerName[moduleId]} x{" "}
										{ModulesService.getAllModules()[moduleId].name}
									</div>
								</Flex>
							))}
						</Flex>

						<Flex gap="1rem" direction="column" alignItems="end">
							<Input
								label="Nom du vaisseau"
								value={shipName}
								onChange={(e: any) => setShipName(e.target.value)}
								variant="bordered"
							/>
							<BuildButton
								isDisabled={modulesEmplacement > currentShipClass.emplacement}
								onPress={onSubmit}
								disabled={
									modulesEmplacement > currentShipClass.emplacement ||
									Object.values(totalResources).some(
										(r) => r > currentPlayerActivePlanet.resources[r]
									)
								}
								title="Créer"
							/>
						</Flex>
					</Flex>
					<Spacer y={6} />
					<Flex justifyContent="space-between" alignItems="start">
						<div>
							<Tabs>
								{[
									{ label: "Moteurs", type: IModuleType.ENGINE },
									{ label: "Cargo", type: IModuleType.CARGO },
									{ label: "Armes", type: IModuleType.WEAPON },
									{ label: "Défense", type: IModuleType.DEFENSE },
									{ label: "Autre", type: IModuleType.OTHER }
								].map((category) => {
									return (
										<Tab key={category.label} title={category.label}>
											<Defer>
												{modules
													.filter((m) => m.type === category.type)
													.map((module) => (
														<ModuleShipBuilder
															key={module.id}
															module={module}
															setSelectedModules={setSelectedModules}
															selectedModules={selectedModules}
														/>
													))}
											</Defer>
										</Tab>
									)
								})}
							</Tabs>
						</div>
						<CustomGridResources>
							{Object.values(ResourcesService.getAllResources()).map(
								(resource) => (
									<React.Fragment key={resource.name}>
										<img
											src={resource.img}
											height="25px"
											width="25px"
											alt={resource.name}
										/>
										<div>{resource.name}</div>
										<ColoredAvailableResource
											$available={
												totalResources[resource.name] <=
												currentPlayerActivePlanet.resources[resource.name]
											}
										>
											{totalResources[resource.name]}
										</ColoredAvailableResource>
									</React.Fragment>
								)
							)}
						</CustomGridResources>
					</Flex>
				</Flex>
			</Container>
		</FullContainer>
	)
}

export default ShipBuilder
