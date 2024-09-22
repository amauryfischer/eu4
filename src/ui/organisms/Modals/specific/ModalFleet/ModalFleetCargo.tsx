import useCurrentFleet from "@/hooks/current/use-current-fleet.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import FleetService from "@/services/FleetService"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IModifier } from "@/type/data/IModule"
import { IPlanet } from "@/type/data/IPlanet"
import Button from "@/ui/atoms/buttons/Button"
import Flex from "@/ui/atoms/Flex"
import BProgress from "@/ui/molecules/progress/BProgress"
import {
	ButtonGroup,
	ModalBody,
	ModalFooter,
	Slider,
	SliderValue
} from "@nextui-org/react"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 200px 200px 1fr 200px 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  align-items: center;
`
const SButton = styled(Button)`
  min-width: 150px !important;
`
const ModalFleetCargo = ({
	setIsOpeningSoute
}: {
	setIsOpeningSoute: (value: boolean) => void
}) => {
	const currentFleet = useCurrentFleet()
	const [oldFleetCargo, setOldFleetCargo] = useState(currentFleet?.cargo)

	const ships = useShips()
	const planets = usePlanets()
	const [newResourcesValue, setNewResourcesValue] = useState(
		currentFleet?.cargo
	)
	const { updateFleet } = useFleetsActions()
	const { updatePlanet } = usePlanetsActions()
	const orbitPlanet = Object.values(planets).find(
		(p) =>
			p.position.system === currentFleet?.position?.system &&
			p.position.systemPosition.x ===
				currentFleet?.position?.systemPosition?.x &&
			p.position.systemPosition.y ===
				currentFleet?.position?.systemPosition?.y &&
			p.position.systemPosition.z === currentFleet?.position?.systemPosition?.z
	)

	const submitTransferCargo = () => {
		const newFleet = _.cloneDeep(currentFleet)
		const allresources = Object.keys(ResourcesService.getAllResources())
		const newPlanet = _.cloneDeep(
			Object.values(planets).find(
				(p) =>
					p.position.system === currentFleet?.position?.system &&
					p.position.systemPosition.x ===
						currentFleet?.position?.systemPosition?.x &&
					p.position.systemPosition.y ===
						currentFleet?.position?.systemPosition?.y &&
					p.position.systemPosition.z ===
						currentFleet?.position?.systemPosition?.z
			)
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
				0
			)
			const diffFleet = newResourceValueFleet - previousResourceValueFleet
			_.set(
				newPlanet,
				`resources.${resource}`,
				oldResourceValuePlanet - diffFleet
			)
		})
		updatePlanet(newPlanet.id, newPlanet)
		updateFleet(newFleet.id, newFleet)
	}

	const cargoCapacity = FleetService.getFleetStats({
		ships: currentFleet.shipIds.map((shipId) => ships[shipId]),
		modifier: IModifier.CARGO
	})
	const currentResourcesAmount = Object.values(
		ResourcesService.getAllResources()
	).reduce((accumulator, resource) => {
		return accumulator + (newResourcesValue?.[resource?.name] ?? 0)
	}, 0)

	useEffect(() => {
		if (!_.isEqual(currentFleet?.cargo, oldFleetCargo)) {
			setOldFleetCargo(currentFleet?.cargo)
		}
	}, [currentFleet?.cargo])

	useEffect(() => {
		setNewResourcesValue(oldFleetCargo)
	}, [oldFleetCargo])

	if (!orbitPlanet) {
		return <>vide</>
	}

	return (
		<>
			<ModalBody>
				<Flex direction="column">
					<h2>Resources</h2>

					<BProgress
						showValueLabel
						value={(currentResourcesAmount * 100) / cargoCapacity}
						label={`${currentResourcesAmount} / ${cargoCapacity}`}
					/>
					<GridContainer>
						<div />
						<div />
						<div>Soute</div>
						<div />
						<div />
						<div>Planète : {orbitPlanet?.name}</div>
						{Object.values(ResourcesService.getAllResources()).map(
							(resource) => {
								const maxResource =
									(orbitPlanet?.resources?.[resource?.name] ?? 0) +
									(currentFleet?.cargo?.[resource?.name] ?? 0)

								const resourcesAlreadyInFleetInAllOtherResources =
									Object.values(ResourcesService.getAllResources()).reduce(
										(accumulator, currentResource) => {
											if (currentResource.name === resource.name) {
												return accumulator
											}
											return (
												accumulator +
												(newResourcesValue?.[currentResource?.name] ?? 0)
											)
										},
										0
									)
								return (
									<React.Fragment key={resource.name}>
										<img
											src={resource.img}
											style={{ width: "3rem", height: "3rem" }}
											alt={resource.name}
										/>
										<div>{resource.name}</div>
										<input
											value={ResourcesService.renderResources(
												newResourcesValue?.[resource?.name] ?? 0
											)}
											onChange={(e) => {
												let value = _.isEmpty(e.target.value)
													? "0"
													: e.target.value

												if (Number.parseInt(value) > maxResource) {
													value = String(maxResource)
												}
												// @ts-ignore
												setNewResourcesValue({
													...newResourcesValue,
													[resource?.name]: Number(value)
												})
											}}
										/>
										<ButtonGroup>
											<SButton
												variant="bordered"
												color="red"
												className="!min-w-[200px]"
												disabled={newResourcesValue?.[resource?.name] === 0}
												onClick={() => {
													// @ts-ignore
													setNewResourcesValue({
														...newResourcesValue,
														[resource?.name]: 0
													})
												}}
											>
												Vider
											</SButton>
											<SButton
												variant="bordered"
												$color="emerald800"
												magnetic={false}
												className="!min-w-[200px]"
												disabled={currentResourcesAmount >= cargoCapacity}
												onClick={() => {
													if (currentResourcesAmount >= cargoCapacity) {
														return
													}
													// @ts-ignore

													if (
														cargoCapacity - currentResourcesAmount >
														maxResource
													) {
														// @ts-ignore
														setNewResourcesValue({
															...newResourcesValue,
															[resource?.name]: maxResource
														})
													} else {
														// @ts-ignore
														setNewResourcesValue({
															...newResourcesValue,
															[resource?.name]:
																cargoCapacity - currentResourcesAmount
														})
													}
												}}
											>
												Remplir
											</SButton>
										</ButtonGroup>
										<Slider
											defaultValue={30}
											minValue={0}
											value={newResourcesValue?.[resource?.name] ?? 0}
											onChange={(value: SliderValue) => {
												if (Number(value) < 0) {
													return
												}
												// @ts-ignore
												if (
													Number(value) +
														resourcesAlreadyInFleetInAllOtherResources >
													cargoCapacity
												) {
													// @ts-ignore
													// set at max
													setNewResourcesValue({
														...newResourcesValue,
														[resource?.name]:
															cargoCapacity -
															resourcesAlreadyInFleetInAllOtherResources
													})
													return
												}
												if (!resource.name) {
													return
												}
												// @ts-ignore
												setNewResourcesValue({
													...newResourcesValue,
													[resource?.name]: Number(value)
												})
											}}
											maxValue={Math.min(maxResource, cargoCapacity)}
										/>
										<div>
											Max : {Math.min(maxResource, cargoCapacity)} /
											{ResourcesService.renderResources(
												(orbitPlanet?.resources?.[resource?.name] ?? 0) -
													(newResourcesValue?.[resource?.name] ?? 0) +
													(currentFleet?.cargo?.[resource?.name] ?? 0)
											)}
										</div>
									</React.Fragment>
								)
							}
						)}
					</GridContainer>
				</Flex>
			</ModalBody>
			<ModalFooter>
				<>
					<Button
						variant="bordered"
						color="emerald"
						onClick={() => {
							const tmpNewResources = _.cloneDeep(currentFleet.cargo) as Record<
								RESOURCE_TYPES,
								number
							>
							let remainingCapacity =
								cargoCapacity -
								Object.values(tmpNewResources).reduce(
									(accumulator, currentValue) => accumulator + currentValue,
									0
								)
							Object.values(ResourcesService.getAllResources()).forEach(
								(resource) => {
									const isFull = remainingCapacity <= 0
									if (!isFull) {
										if (
											orbitPlanet?.resources?.[resource?.name] >
											remainingCapacity
										) {
											tmpNewResources[resource?.name] = remainingCapacity
											remainingCapacity = 0
										} else {
											tmpNewResources[resource?.name] =
												orbitPlanet?.resources?.[resource?.name] ?? 0
											remainingCapacity -=
												orbitPlanet?.resources?.[resource?.name] ?? 0
										}
									}
								}
							)
							setNewResourcesValue(tmpNewResources)
						}}
					>
						Remplir tout
					</Button>
					<Button
						variant="bordered"
						color="red"
						onClick={() => {
							const newResources = {} as Record<RESOURCE_TYPES, number>
							Object.values(ResourcesService.getAllResources()).forEach(
								(resource) => {
									newResources[resource?.name] = 0
								}
							)
							setNewResourcesValue(newResources)
						}}
					>
						Vider tout
					</Button>
					<Button
						variant="bordered"
						onClick={() => {
							setIsOpeningSoute(false)
							setNewResourcesValue(currentFleet?.cargo)
						}}
					>
						Annuler
					</Button>
					<SButton
						variant="solid"
						color="emerald600"
						className="!min-w-[200px]"
						onClick={() => {
							submitTransferCargo()
							setIsOpeningSoute(false)
						}}
					>
						Confirmer
					</SButton>
				</>
			</ModalFooter>
		</>
	)
}

export default ModalFleetCargo
