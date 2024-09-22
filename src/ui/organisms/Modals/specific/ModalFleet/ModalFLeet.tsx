"use client"
import {
	Image,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Slider,
	SliderValue,
	Spacer
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import {
	Input,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Button as NextUIButton
} from "@nextui-org/react"

import _ from "lodash"

import useCurrentFleet from "@/hooks/current/use-current-fleet.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import { setCurrentFleet, setCurrentShip } from "@/redux/slice/current.slice"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import ShipService from "@/services/ShipService"
import { IModifier, IModule } from "@/type/data/IModule"
import { IPlanet } from "@/type/data/IPlanet"
import Flex from "@/ui/atoms/Flex"
import BAvatar from "@/ui/atoms/avatar/BAvatar"
import BButton from "@/ui/atoms/buttons/Button"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import BModal from "@/ui/molecules/modal/BModal"
import BProgress from "@/ui/molecules/progress/BProgress"
import RenderResources from "@/ui/organisms/RenderResources"
import Button from "@/ui/atoms/buttons/Button"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import { TaskType } from "@prisma/client"
import moment from "moment"
import FuelBar from "../../../entity/fleet/FuelBar"
import FleetService from "@/services/FleetService"
import ModalFleetCargo from "./ModalFleetCargo"

const ModalFleet = () => {
	const currentFleet = useCurrentFleet()
	const [system, setSystem] = useState(currentFleet?.position?.system)
	const [x, setX] = useState(currentFleet?.position?.systemPosition?.x)
	const [y, setY] = useState(currentFleet?.position?.systemPosition?.y)
	const [z, setZ] = useState(currentFleet?.position?.systemPosition?.z)
	const dispatch = useDispatch()
	const { createTask, fetchTasks } = useTasksActions()
	const user = useCurrentUser()
	const fetParcels = useParcelsActions()
	const ships = useShips()
	const [isOpeningSoute, setIsOpeningSoute] = useState(false)

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

	const moveFleet = () => {
		updateFleet(currentFleet.id, {
			...currentFleet,
			position: {
				system,
				systemPosition: {
					x,
					y,
					z
				}
			}
		})
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
			planet.position.systemPosition.z.toString() === z.toString()
	)

	if (!currentFleet) {
		return null
	}

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
						<div className="text-4xl font-bold">{currentFleet.name}</div>
					</ModalHeader>
					<ModalBody>
						<Flex gap="1rem" fullWidth justifyContent="space-between">
							<Flex gap="1rem" wrap="wrap" direction="column">
								{shipIds.map((shipId, index) => {
									const numberOfNeededRows = Math.ceil((shipIds.length + 1) / 3)
									const img =
										ShipService.getAllShips()[ships?.[shipId]?.class]?.img
									return (
										<Image
											isBlurred
											isZoomed
											key={shipId}
											src={img}
											width={100}
											alt={ships?.[shipId]?.name}
											onClick={() => {
												dispatch(setCurrentShip(shipId))
											}}
										/>
									)
								})}
							</Flex>
							{!isOpeningSoute && (
								<Flex direction="column" gap="1rem">
									<Flex direction="column">
										<div className="text-white">Carburant</div>
										<FuelBar
											progress={
												(currentFleet?.fuel * 100) /
												FleetService.getTotalFuel({
													ships: shipIds.map((shipId) => ships[shipId])
												})
											}
										/>
									</Flex>
									<Flex direction="column">
										<Flex gap="0.5rem" className="max-w-[500px]">
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
													createTask({
														type: TaskType.FLYING_FLEET,
														endDate: moment().add(10, "seconds").format(),
														details: {
															position: {
																system,
																systemPosition: {
																	x,
																	y,
																	z
																}
															},
															fleetId: currentFleet.id
														},
														userId: user.id
													})
													fetchTasks()
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
										<Spacer y={8} />
										<RenderResources resources={currentFleet?.cargo} />
									</Flex>
								</Flex>
							)}
						</Flex>
					</ModalBody>
					{remainingPlanet.length > 0 &&
						remainingPlanet[0].userId === user.id &&
						isOpeningSoute && (
							<ModalFleetCargo setIsOpeningSoute={setIsOpeningSoute} />
						)}
					{!isOpeningSoute && (
						<ModalFooter>
							<>
								<CloseElementButton
									onPress={() => dispatch(setCurrentFleet(undefined))}
								/>
								<Popover>
									<PopoverTrigger>
										<Button color="primary" variant="bordered">
											Réservoir
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<div className="p-4">
											<Slider />
										</div>
									</PopoverContent>
								</Popover>
								{!isOpeningSoute && (
									<>
										{remainingPlanet.length > 0 && (
											<Button
												color="cyan"
												variant="bordered"
												onClick={() => {
													setIsOpeningSoute(true)
												}}
											>
												Remplir la soute
											</Button>
										)}
									</>
								)}
							</>
						</ModalFooter>
					)}
				</ModalContent>
			</BModal>
		</>
	)
}

export default ModalFleet
