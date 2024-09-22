import useCurrentFleet from "@/hooks/current/use-current-fleet.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import FleetService from "@/services/FleetService"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import { IPlanet } from "@/type/data/IPlanet"
import Flex from "@/ui/atoms/Flex"
import BProgress from "@/ui/molecules/progress/BProgress"
import { ModalBody, ModalFooter, Slider, SliderValue } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import _ from "lodash"
import useShips from "@/hooks/data/entity/use-ships.hook"
import Button from "@/ui/atoms/buttons/Button"
import ShipService from "@/services/ShipService"

const ModalFleetFuel = ({
	setIsOpeningFuel
}: {
	setIsOpeningFuel: (value: boolean) => void
}) => {
	const currentFleet = useCurrentFleet()
	const [oldFuel, setOldFuel] = useState(currentFleet?.fuel)
	const [newFuelValue, setNewFuelValue] = useState(currentFleet?.fuel)
	const { updateFleet } = useFleetsActions()
	const { updatePlanet } = usePlanetsActions()
	const ships = useShips()
	const planets = usePlanets()

	const orbitPlanet = Object.values(planets).find(
		(p) =>
			p.position.system === currentFleet?.position?.system &&
			p.position.systemPosition.x ===
				currentFleet?.position?.systemPosition?.x &&
			p.position.systemPosition.y ===
				currentFleet?.position?.systemPosition?.y &&
			p.position.systemPosition.z === currentFleet?.position?.systemPosition?.z
	)

	const submitTransferFuel = () => {
		const newFleet = _.cloneDeep(currentFleet)
		const newPlanet = _.cloneDeep(orbitPlanet) as IPlanet

		const diffFuel = newFuelValue - oldFuel
		newFleet.fuel = newFuelValue

		if (newPlanet.resources[RESOURCE_TYPES.HYDROGENE] >= diffFuel) {
			newPlanet.resources[RESOURCE_TYPES.HYDROGENE] -= diffFuel
		} else {
			console.error("Not enough hydrogen on the planet to transfer fuel.")
			return
		}

		console.log("Updating planet with ID:", newPlanet.id)
		console.log("New planet resources:", newPlanet.resources)

		updatePlanet(newPlanet.id, newPlanet)
		updateFleet(newFleet.id, newFleet)
	}

	const maxFuelCapacity = currentFleet?.shipIds.reduce((acc, shipId) => {
		const ship = ships[shipId]
		const allShips = ShipService.getAllShips()
		const shipClass = allShips[ship.class] // Renamed 'class' to 'shipClass'
		return acc + shipClass.fuelSpace
	}, 0)

	useEffect(() => {
		if (currentFleet?.fuel !== oldFuel) {
			setOldFuel(currentFleet?.fuel)
		}
	}, [currentFleet?.fuel])

	useEffect(() => {
		setNewFuelValue(oldFuel)
	}, [oldFuel])

	if (!orbitPlanet) {
		return null
	}
	return (
		<>
			<ModalBody>
				<Flex direction="column">
					<h2>Fuel</h2>
					max value :{" "}
					{Math.min(
						orbitPlanet.resources[RESOURCE_TYPES.HYDROGENE] + oldFuel,
						maxFuelCapacity
					)}
					min value :{" "}
					{orbitPlanet.resources[RESOURCE_TYPES.HYDROGENE] + oldFuel}
					old fuel : {oldFuel}
					max fuel capacity : {maxFuelCapacity}
					<BProgress
						showValueLabel
						value={(newFuelValue * 100) / maxFuelCapacity}
						label={`${newFuelValue} / ${maxFuelCapacity}`}
					/>
					<Slider
						defaultValue={3000}
						minValue={0}
						maxValue={Math.min(
							orbitPlanet.resources[RESOURCE_TYPES.HYDROGENE] + oldFuel,
							maxFuelCapacity
						)}
						value={newFuelValue}
						onChange={(value: SliderValue) => {
							let appliedValue = Number(value)
							if (appliedValue > maxFuelCapacity) {
								appliedValue = maxFuelCapacity
							}
							_.debounce(() => {
								setNewFuelValue(appliedValue)
							}, 100)()
						}}
					/>
				</Flex>
			</ModalBody>
			<ModalFooter>
				<>
					<Button
						variant="bordered"
						color="emerald"
						onClick={() => {
							setNewFuelValue(maxFuelCapacity)
						}}
					>
						Fill All
					</Button>
					<Button
						variant="bordered"
						color="red"
						onClick={() => {
							setNewFuelValue(0)
						}}
					>
						Empty All
					</Button>
					<Button
						variant="bordered"
						onClick={() => {
							setIsOpeningFuel(false)
							setNewFuelValue(currentFleet?.fuel)
						}}
					>
						Cancel
					</Button>
					<Button
						variant="solid"
						color="emerald600"
						onClick={() => {
							submitTransferFuel()
							setIsOpeningFuel(false)
						}}
					>
						Confirm
					</Button>
				</>
			</ModalFooter>
		</>
	)
}

export default ModalFleetFuel