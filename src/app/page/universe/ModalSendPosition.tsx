import useCurrentSendPosition from "@/hooks/current/use-current-send-position"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import { setCurrentSendPosition } from "@/redux/slice/current.slice"
import ShipService from "@/services/ShipService"
import BButton from "@/ui/atoms/buttons/BButton"
import { Dialog } from "@mui/material"
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react"
import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 100px 140px 250px;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
`
const ModalSendPosition = () => {
	const fleets = useFleets()
	const ships = useShips()
	const currentSendPosition = useCurrentSendPosition()
	const dispatch = useDispatch()
	const { updateFleet } = useFleetsActions()
	return (
		<Modal
			size={"5xl"}
			isOpen={!!currentSendPosition}
			onOpenChange={() => {
				dispatch(setCurrentSendPosition(undefined))
			}}
			title="Selectionnez une flotte"
		>
			<ModalContent>
				<ModalHeader>Selectionnez une flotte</ModalHeader>
				<ModalBody>
					<GridContainer>
						{(Object.values(fleets) ?? []).map((fleet) => {
							const shipId = fleet.shipIds[0]
							return (
								<React.Fragment key={fleet.id}>
									<img
										width={250}
										height={100}
										src={ShipService.getAllShips()[ships?.[shipId]?.class]?.img}
									/>
									<div>{fleet.name}</div>
									<div>
										{fleet.position.system}
										{":"}
										{fleet.position.systemPosition.x}
										{":"}
										{fleet.position.systemPosition.y}
										{":"}
										{fleet.position.systemPosition.z}
									</div>
									<BButton
										color="blue"
										disabled={
											fleet.position.system === currentSendPosition?.system &&
											fleet.position.systemPosition.x ===
												currentSendPosition?.systemPosition.x &&
											fleet.position.systemPosition.y ===
												currentSendPosition?.systemPosition.y &&
											fleet.position.systemPosition.z ===
												currentSendPosition?.systemPosition.z
										}
										onClick={() => {
											updateFleet(fleet.id, {
												...fleet,
												position: {
													...fleet.position,
													system: currentSendPosition.system,
													systemPosition: {
														...fleet.position.systemPosition,
														x: currentSendPosition.systemPosition.x,
														y: currentSendPosition.systemPosition.y,
														z: currentSendPosition.systemPosition.z,
													},
												},
											})
											dispatch(setCurrentSendPosition(undefined))
										}}
									>
										Envoyer
									</BButton>
								</React.Fragment>
							)
						})}
					</GridContainer>
				</ModalBody>
				<ModalFooter>
					<BButton
						variant="bordered"
						color="caramel"
						onClick={() => dispatch(setCurrentSendPosition(undefined))}
					>
						Fermer
					</BButton>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ModalSendPosition
