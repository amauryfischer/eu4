"use client";
import useCurrentPirate from "@/hooks/current/use-current-pirate.hook";
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook";
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import {
	setCurrentPirate,
	setCurrentSendPosition,
} from "@/redux/slice/current.slice";
import { IFleet } from "@/type/data/IFleet";
import { TaskType } from "@/type/data/ITask"
import Flex from "@/ui/atoms/Flex";
import AttackButton from "@/ui/atoms/buttons/AttackButton";
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import BModal from "@/ui/molecules/modal/BModal";
import ListFleet from "@/ui/organisms/entity/fleet/ListFleet"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spacer,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const ModalPirate = () => {
	const dispatch = useDispatch()
	const pirate = useCurrentPirate()
	const fleets = useFleetsOnPosition(pirate?.position)
	const tasks = useTasks()
	if (!pirate) {
		return null
	}
	const combatTask = Object.values(tasks).find(
		(task) =>
			task.type === TaskType.FIGHT &&
			fleets.some((fleet) => task.details?.fleetIds?.includes(fleet.id))
	)
	return (
		<>
			<BModal
				size="5xl"
				isOpen={!!pirate}
				onOpenChange={() => dispatch(setCurrentPirate(undefined))}
			>
				<ModalContent>
					<ModalHeader>{pirate.name ?? "Pirate"}</ModalHeader>
					<ModalBody>
						<Flex direction="column" alignItems="start" fullWidth>
							<Flex>
								{/* <CanvasContainer>
									<Canvas>
										<ambientLight />
										<pointLight position={[10, 10, 10]} />
										<Suspense fallback={null}>
											<Image3D
												sizeMultiplier={3}
												position={[0, 0, 0]}
												imageUrl={`/images/other/pirate.png`}
											/>
										</Suspense>
										<OrbitControls
											enableZoom={true}
											makeDefault
											autoRotate
											autoRotateSpeed={1}
										/>
									</Canvas>
								</CanvasContainer> */}
								<div>
									<ul>
										<li>
											{pirate.position.system}
											{":"}
											{pirate.position.systemPosition.x}
											{":"}
											{pirate.position.systemPosition.y}
											{":"}
											{pirate.position.systemPosition.z}
										</li>
									</ul>
								</div>
							</Flex>
							<Spacer y={12} />
							<ListFleet
								fleets={fleets}
								additionalRows={[
									(fleet: IFleet) => (
										<AttackButton onClick={() => {}} title="Attaquer" />
									)
								]}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<CloseElementButton
							onClick={() => {
								dispatch(setCurrentPirate(undefined))
							}}
						/>
						<SendFleetButton
							onClick={() => {
								dispatch(setCurrentSendPosition(pirate.position))
							}}
							title="Envoyer une flotte"
						/>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	)
};

export default ModalPirate;
