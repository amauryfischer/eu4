import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slider,
} from "@mui/material"

import { useNavigate } from "react-router"
import { Avatar, AvatarGroup, Input, Modal } from "@nextui-org/react"

import _ from "lodash"

import { Canvas } from "@react-three/fiber"
import Image3D from "../solarSystem/Image3D"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import useCurrentFleet from "@/hooks/current/use-current-fleet.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import { IFleet } from "@/type/data/IFleet"
import { IPlanet } from "@/type/data/IPlanet"
import ParcelService from "@/services/ParcelService"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import ShipService from "@/services/ShipService"
import { setCurrentFleet } from "@/redux/slice/current.slice"
import { SButton } from "@/ui/atoms/buttons/BButton/BButton.styled"
import Flex from "@/ui/atoms/Flex"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import BButton from "@/ui/atoms/buttons/BButton"

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`

const SDialogTitle = styled(DialogTitle)`
  font-size: 3rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
`
const CanvasContainer = styled.div`
  width: 100%;
  height: 500px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 200px 200px 1fr 200px;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  align-items: center;
`
const ModalFleet = () => {
	const currentFleet = useCurrentFleet()
	const [system, setSystem] = useState(currentFleet?.data?.position?.system)
	const [x, setX] = useState(currentFleet?.data?.position?.systemPosition?.x)
	const [y, setY] = useState(currentFleet?.data?.position?.systemPosition?.y)
	const [z, setZ] = useState(currentFleet?.data?.position?.systemPosition?.z)
	const dispatch = useDispatch()
	const ships = useShips()
	const [isOpeningSoute, setIsOpeningSoute] = useState(false)
	const [newResourcesValue, setNewResourcesValue] = useState(
		currentFleet?.data?.cargo,
	)
	const [fleets, setFleets] = useState<IFleet[]>([])
	const [planets, setPlanets] = useState<IPlanet[]>([])
	const { updateFleet } = useFleetsActions()
	const { updatePlanet } = usePlanetsActions()

	const fetch = async () => {
		const response = await ParcelService.getParcelDetails(
			currentFleet?.data?.position?.system,
		)
		setFleets(response.data.fleets)
		setPlanets(response.data.planets)
	}

	useEffect(() => {
		setNewResourcesValue(currentFleet?.data?.cargo)
	}, [currentFleet])

	useEffect(() => {
		fetch()
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
			planets.find(
				(p) =>
					p.position.system === system &&
					p.position.systemPosition.x === x &&
					p.position.systemPosition.y === y &&
					p.position.systemPosition.z === z,
			),
		) as IPlanet
		allresources.forEach((resource) => {
			const previousResourceValueFleet = _.get(
				newFleet,
				`data.cargo.${resource}`,
				0,
			)
			const newResourceValueFleet = _.get(newResourcesValue, resource, 0)
			if (!newFleet.data?.cargo) {
				newFleet.data.cargo = {}
			}
			newFleet.data.cargo[resource] = newResourceValueFleet

			const oldResourceValuePlanet = _.get(
				newPlanet,
				`data.resources.${resource}`,
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
		setSystem(currentFleet?.data?.position?.system)
		setX(currentFleet?.data?.position?.systemPosition?.x)
		setY(currentFleet?.data?.position?.systemPosition?.y)
		setZ(currentFleet?.data?.position?.systemPosition?.z)
	}, [currentFleet])

	if (!currentFleet) {
		return null
	}
	const shipIds = currentFleet.data.shipIds
	const shipImgs = shipIds.map(
		(id) => ShipService.getAllShips()[ships?.[id]?.class]?.img,
	)

	const remainingPlanet = planets.filter(
		(planet) =>
			planet.position.system === system &&
			planet.position.systemPosition.x.toString() === x.toString() &&
			planet.position.systemPosition.y.toString() === y.toString() &&
			planet.position.systemPosition.z.toString() === z.toString(),
	)

	return (
		<>
			<Modal
				isOpen={!!currentFleet}
				title={currentFleet.data.name}
				onOpenChange={() => dispatch(setCurrentFleet(undefined))}
			>
				<Flex>
					<div>
						<h2>Ships</h2>
						<AvatarGroup>
							{shipImgs.map((img, index) => (
								<Avatar key={index} size="lg" src={img} color="success" />
							))}
						</AvatarGroup>
						"bouger"
					</div>
				</Flex>
				{JSON.stringify(currentFleet.data?.cargo, null, 2)}

				{remainingPlanet.length > 0 && isOpeningSoute && (
					<Flex direction="column">
						<h2>Resources</h2>
						<SButton
							variant="outlined"
							$color="emerald"
							magnetic={false}
							onClick={() => {
								const newResources = {} as Record<RESOURCE_TYPES, number>
								Object.values(ResourcesService.getAllResources()).forEach(
									(resource) => {
										const maxResource =
											(remainingPlanet[0].resources?.[resource?.name] ?? 0) +
											(currentFleet.data?.cargo?.[resource?.name] ?? 0)
										newResources[resource?.name] = maxResource
									},
								)
								setNewResourcesValue(newResources)
							}}
						>
							Remplir tout
						</SButton>
						<SButton
							variant="outlined"
							$color="red"
							magnetic={false}
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
						</SButton>
						<GridContainer>
							<div />
							<div>Soute</div>
							<div />
							<div />
							<div>Planète : {remainingPlanet[0].name}</div>
							{Object.values(ResourcesService.getAllResources()).map(
								(resource) => {
									const maxResource =
										(remainingPlanet[0].resources?.[resource?.name] ?? 0) +
										(currentFleet.data?.cargo?.[resource?.name] ?? 0)
									return (
										<React.Fragment key={resource.name}>
											<img
												src={resource.img}
												style={{ width: "3rem", height: "3rem" }}
											/>
											<div>{resource.name}</div>
											<input
												value={String(newResourcesValue?.[resource?.name] ?? 0)}
												onChange={(e) => {
													let value = _.isEmpty(e.target.value)
														? "0"
														: e.target.value

													if (parseInt(value) > maxResource) {
														value = String(maxResource)
													}
													setNewResourcesValue({
														...newResourcesValue,
														[resource?.name]: Number(value),
													})
												}}
											/>
											<SButton
												variant="outlined"
												$color="emerald"
												magnetic={false}
												onClick={() => {
													setNewResourcesValue({
														...newResourcesValue,
														[resource?.name]: maxResource,
													})
												}}
											>
												Remplir
											</SButton>
											<Slider
												defaultValue={30}
												valueLabelDisplay="auto"
												min={0}
												value={newResourcesValue?.[resource?.name] ?? 0}
												onChange={(e, value) => {
													setNewResourcesValue({
														...newResourcesValue,
														[resource?.name]: Number(value),
													})
												}}
												max={maxResource}
											/>
											<div>
												{(
													(remainingPlanet[0].resources?.[resource?.name] ??
														0) -
													(newResourcesValue?.[resource?.name] ?? 0) +
													(currentFleet.data?.cargo?.[resource?.name] ?? 0)
												).toString()}
											</div>
										</React.Fragment>
									)
								},
							)}
						</GridContainer>
					</Flex>
				)}
				<>
					{" "}
					{!isOpeningSoute && (
						<>
							<BButton
								onClick={() => {
									dispatch(setCurrentFleet(undefined))
								}}
							/>
							{remainingPlanet.length > 0 && (
								<SButton
									variant="outlined"
									$color="cyan"
									onClick={() => {
										setIsOpeningSoute(true)
									}}
									magnetic={false}
								>
									Remplir la soute
								</SButton>
							)}

							<BButton
								onClick={() => {
									moveFleet()
									dispatch(setCurrentFleet(undefined))
								}}
							>
								Confirmer
							</BButton>
						</>
					)}
					{isOpeningSoute && (
						<>
							<BButton
								onClick={() => {
									setIsOpeningSoute(false)
									setNewResourcesValue(currentFleet?.data?.cargo)
								}}
							/>
							<SButton
								variant="outlined"
								$color="emerald"
								onClick={() => {
									submitTransferCargo()
									setIsOpeningSoute(false)
								}}
							>
								Confirmer
							</SButton>
						</>
					)}
				</>
			</Modal>
		</>
	)
}

export default ModalFleet
