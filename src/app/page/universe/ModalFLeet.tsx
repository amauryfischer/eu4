import { Slider, SliderValue } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import {
	Avatar,
	AvatarGroup,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react"

import _ from "lodash"

import useCurrentFleet from "@/hooks/current/use-current-fleet.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import { setCurrentFleet, setCurrentShip } from "@/redux/slice/current.slice"
import ParcelService from "@/services/ParcelService"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import ShipService from "@/services/ShipService"
import { IFleet } from "@/type/data/IFleet"
import { IPlanet } from "@/type/data/IPlanet"
import Flex from "@/ui/atoms/Flex"
import BButton from "@/ui/atoms/buttons/BButton"
import { SButton } from "@/ui/atoms/buttons/BButton/BButton.styled"
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import RenderResources from "@/ui/organisms/RenderResources"
import BAvatar from "@/ui/atoms/avatar/BAvatar"
import ModulesService from "@/services/ModulesService"
import { IModifier, IModule } from "@/type/data/IModule"
import BModal from "@/ui/molecules/modal/BModal"
import BProgress from "@/ui/molecules/progress/BProgress"

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 200px 200px 1fr 200px 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  align-items: center;
`
const ModalFleet = () => {
	const currentFleet = useCurrentFleet()
	const [system, setSystem] = useState(currentFleet?.position?.system)
	const [x, setX] = useState(currentFleet?.position?.systemPosition?.x)
	const [y, setY] = useState(currentFleet?.position?.systemPosition?.y)
	const [z, setZ] = useState(currentFleet?.position?.systemPosition?.z)
	const dispatch = useDispatch()
	const fetParcels = useParcelsActions()
	const ships = useShips()
	const [isOpeningSoute, setIsOpeningSoute] = useState(false)
	const [newResourcesValue, setNewResourcesValue] = useState(
		currentFleet?.cargo,
	)
	const fleets = useFleets()
	const planets = usePlanets()
	const { updateFleet } = useFleetsActions()
	const { updatePlanet } = usePlanetsActions()

	useEffect(() => {
		const fetch = async () => {
			const res = await fetParcels(currentFleet?.position?.system ?? "")
			console.log(res)
		}
		fetch()
	}, [])

	useEffect(() => {
		setNewResourcesValue(currentFleet?.cargo)
	}, [currentFleet])

	const moveFleet = () => {
		updateFleet(currentFleet.id, {
			...currentFleet,
			position: {
				system,
				systemPosition: {
					x,
					y,
					z,
				},
			},
		})
	}

	const submitTransferCargo = () => {
		const newFleet = _.cloneDeep(currentFleet)
		const allresources = Object.keys(ResourcesService.getAllResources())
		const newPlanet = _.cloneDeep(
			Object.values(planets).find(
				(p) =>
					p.position.system === system &&
					p.position.systemPosition.x === x &&
					p.position.systemPosition.y === y &&
					p.position.systemPosition.z === z,
			),
		) as IPlanet
		allresources.forEach((resource) => {
			const previousResourceValueFleet = _.get(newFleet, `cargo.${resource}`, 0)
			const newResourceValueFleet = _.get(newResourcesValue, resource, 0)
			if (!newFleet.cargo) {
				newFleet.cargo = {} as Record<RESOURCE_TYPES, number>
			}
			// @ts-ignore
			newFleet.cargo[resource] = newResourceValueFleet
			const oldResourceValuePlanet = _.get(
				newPlanet,
				`resources.${resource}`,
				0,
			)
			const diffFleet = newResourceValueFleet - previousResourceValueFleet
			_.set(
				newPlanet,
				`resources.${resource}`,
				oldResourceValuePlanet - diffFleet,
			)
		})
		updatePlanet(newPlanet.id, newPlanet)
		updateFleet(newFleet.id, newFleet)
	}

	useEffect(() => {
		setSystem(currentFleet?.position?.system)
		setX(currentFleet?.position?.systemPosition?.x)
		setY(currentFleet?.position?.systemPosition?.y)
		setZ(currentFleet?.position?.systemPosition?.z)
	}, [currentFleet])

	if (!currentFleet) {
		return null
	}
	const shipIds = currentFleet.shipIds
	const remainingPlanet = Object.values(planets).filter(
		(planet) =>
			planet.position.system === system &&
			planet.position.systemPosition.x.toString() === x.toString() &&
			planet.position.systemPosition.y.toString() === y.toString() &&
			planet.position.systemPosition.z.toString() === z.toString(),
	)

	if (!currentFleet) {
		return null
	}
	const fleetCapacity = currentFleet.shipIds.reduce((accumulator, shipId) => {
		const ship = ships?.[shipId]
		return (
			accumulator +
			(ships[shipId]?.modules ?? []).reduce((accumulator, module: IModule) => {
				return (
					accumulator +
					(module && module.modifier
						? module.modifier[IModifier.CARGO] ?? 0
						: 0)
				)
			}, 0)
		)
	}, 0)

	const currentResourcesAmount = Object.values(
		ResourcesService.getAllResources(),
	).reduce((accumulator, resource) => {
		return (
			accumulator +
			(currentFleet?.cargo?.[resource?.name] ?? 0) +
			(newResourcesValue?.[resource?.name] ?? 0)
		)
	}, 0)

	return (
		<>
			<BModal
				size="5xl"
				isOpen={!!currentFleet}
				title={currentFleet.name}
				onOpenChange={() => dispatch(setCurrentFleet(undefined))}
			>
				<ModalContent>
					<ModalHeader>
						<Flex alignItems="center" gap="1rem">
							<h2>{currentFleet.name}</h2>
						</Flex>
					</ModalHeader>
					<ModalBody>
						<Flex gap="1rem">
							<Flex direction="column" gap="1rem">
								{shipIds.map((shipId, index) => {
									const img =
										ShipService.getAllShips()[ships?.[shipId]?.class]?.img
									return (
										<BAvatar
											key={index}
											radius="lg"
											src={img}
											color="success"
											className="w-32 h-32 text-large"
											onClick={() => {
												dispatch(setCurrentShip(shipId))
											}}
										/>
									)
								})}
							</Flex>
							<Flex direction="column">
								{!isOpeningSoute && (
									<RenderResources resources={currentFleet?.cargo} />
								)}
								<Flex gap="0.5rem">
									<Input
										value={system?.toString()}
										onValueChange={(e) => setSystem(e)}
										type="number"
										variant="bordered"
									/>
									<Input
										value={x?.toString()}
										onValueChange={(e) => setX(Number(e))}
										type="number"
										variant="bordered"
									/>
									<Input
										value={y?.toString()}
										onValueChange={(e) => setY(Number(e))}
										type="number"
										variant="bordered"
									/>
									<Input
										value={z?.toString()}
										onValueChange={(e) => setZ(Number(e))}
										type="number"
										variant="bordered"
									/>
									<BButton
										variant="bordered"
										color="emerald600"
										onClick={() => {
											moveFleet()
											dispatch(setCurrentFleet(undefined))
										}}
										isDisabled={
											system === currentFleet?.position?.system &&
											x === currentFleet?.position?.systemPosition?.x &&
											y === currentFleet?.position?.systemPosition?.y &&
											z === currentFleet?.position?.systemPosition?.z
										}
									>
										Déplacer
									</BButton>
								</Flex>
							</Flex>
						</Flex>
						{remainingPlanet.length > 0 && isOpeningSoute && (
							<Flex direction="column">
								<h2>Resources</h2>
								<Flex>
									<BButton
										variant="bordered"
										color="emerald"
										onClick={() => {
											const tmpNewResources = _.cloneDeep(
												currentFleet.cargo,
											) as Record<RESOURCE_TYPES, number>
											let remainingCapacity =
												fleetCapacity -
												Object.values(tmpNewResources).reduce(
													(accumulator, currentValue) =>
														accumulator + currentValue,
													0,
												)
											Object.values(ResourcesService.getAllResources()).forEach(
												(resource) => {
													const isFull = remainingCapacity <= 0
													if (!isFull) {
														if (
															remainingPlanet[0].resources?.[resource?.name] >
															remainingCapacity
														) {
															tmpNewResources[resource?.name] =
																remainingCapacity
															remainingCapacity = 0
														} else {
															tmpNewResources[resource?.name] =
																remainingPlanet[0].resources?.[
																	resource?.name
																] ?? 0
															remainingCapacity -=
																remainingPlanet[0].resources?.[
																	resource?.name
																] ?? 0
														}
													}
												},
											)
											setNewResourcesValue(tmpNewResources)
										}}
									>
										Remplir tout
									</BButton>
									<BButton
										variant="bordered"
										color="red"
										onClick={() => {
											const newResources = {} as Record<RESOURCE_TYPES, number>
											Object.values(ResourcesService.getAllResources()).forEach(
												(resource) => {
													newResources[resource?.name] = 0
												},
											)
											setNewResourcesValue(newResources)
										}}
									>
										Vider tout
									</BButton>
								</Flex>
								<BProgress
									value={(currentResourcesAmount * 100) / fleetCapacity}
								/>
								<GridContainer>
									<div />
									<div />
									<div>Soute</div>
									<div />
									<div />
									<div>Planète : {remainingPlanet[0].name}</div>
									{Object.values(ResourcesService.getAllResources()).map(
										(resource) => {
											let maxResource =
												(remainingPlanet[0].resources?.[resource?.name] ?? 0) +
												(currentFleet?.cargo?.[resource?.name] ?? 0)

											let resourcesAlreadyInFleetInAllOtherResources =
												Object.values(
													ResourcesService.getAllResources(),
												).reduce((accumulator, currentResource) => {
													if (currentResource.name === resource.name) {
														return accumulator
													}
													return (
														accumulator +
															((currentFleet?.cargo || {})[
																currentResource?.name
															] ?? 0) +
															newResourcesValue?.[currentResource?.name] ?? 0
													)
												}, 0)
											return (
												<React.Fragment key={resource.name}>
													<img
														src={resource.img}
														style={{ width: "3rem", height: "3rem" }}
													/>
													<div>{resource.name}</div>
													<input
														value={ResourcesService.renderResources(
															newResourcesValue?.[resource?.name] ?? 0,
														)}
														onChange={(e) => {
															let value = _.isEmpty(e.target.value)
																? "0"
																: e.target.value

															if (parseInt(value) > maxResource) {
																value = String(maxResource)
															}
															// @ts-ignore
															setNewResourcesValue({
																...newResourcesValue,
																[resource?.name]: Number(value),
															})
														}}
													/>
													<SButton
														variant="outlined"
														$color="emerald800"
														magnetic={false}
														onClick={() => {
															if (currentResourcesAmount >= fleetCapacity) {
																return
															}
															// @ts-ignore

															if (
																fleetCapacity - currentResourcesAmount >
																maxResource
															) {
																// @ts-ignore
																setNewResourcesValue({
																	...newResourcesValue,
																	[resource?.name]: maxResource,
																})
															} else {
																// @ts-ignore
																setNewResourcesValue({
																	...newResourcesValue,
																	[resource?.name]:
																		fleetCapacity - currentResourcesAmount,
																})
															}
														}}
													>
														Remplir
													</SButton>
													<Slider
														defaultValue={30}
														minValue={0}
														value={newResourcesValue?.[resource?.name] ?? 0}
														onChange={(value: SliderValue) => {
															// @ts-ignore
															if (
																Number(value) +
																	resourcesAlreadyInFleetInAllOtherResources >
																fleetCapacity
															) {
																// @ts-ignore
																return
															}
															setNewResourcesValue({
																...newResourcesValue,
																[resource?.name]: Number(value),
															})
														}}
														maxValue={Math.min(maxResource, fleetCapacity)}
													/>
													<div>
														{ResourcesService.renderResources(
															(remainingPlanet[0].resources?.[resource?.name] ??
																0) -
																(newResourcesValue?.[resource?.name] ?? 0) +
																(currentFleet?.cargo?.[resource?.name] ?? 0),
														)}
													</div>
												</React.Fragment>
											)
										},
									)}
								</GridContainer>
							</Flex>
						)}
					</ModalBody>
					<ModalFooter>
						<>
							{" "}
							{!isOpeningSoute && (
								<>
									{remainingPlanet.length > 0 && (
										<BButton
											variant="bordered"
											color="cyan"
											onClick={() => {
												setIsOpeningSoute(true)
											}}
										>
											Remplir la soute
										</BButton>
									)}

									<CloseElementButton
										onPress={() => dispatch(setCurrentFleet(undefined))}
									/>
								</>
							)}
							{isOpeningSoute && (
								<>
									<BButton
										variant="bordered"
										onClick={() => {
											setIsOpeningSoute(false)
											setNewResourcesValue(currentFleet?.cargo)
										}}
									>
										Annuler
									</BButton>
									<BButton
										variant="solid"
										color="emerald600"
										onClick={() => {
											submitTransferCargo()
											setIsOpeningSoute(false)
										}}
									>
										Confirmer
									</BButton>
								</>
							)}
						</>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	)
}

export default ModalFleet
