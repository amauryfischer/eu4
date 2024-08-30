"use client";
import styled from "styled-components";

import useCurrentAsteroid from "@/hooks/current/use-current-asteroid.hook";
import useCurrentUser from "@/hooks/current/use-current-user.hook";
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook";
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook";
import useTasks from "@/hooks/data/entity/use-tasks.hook";
import {
	setCurrentAsteroid,
	setCurrentSendPosition,
} from "@/redux/slice/current.slice";
import { IFleet } from "@/type/data/IFleet";
import { TaskType } from "@/type/data/ITask";
import Flex from "@/ui/atoms/Flex";
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import CollectButton from "@/ui/atoms/buttons/CollectButton";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import BModal from "@/ui/molecules/modal/BModal";
import ListFleet from "@/ui/organisms/ListFleet";
import RenderResources from "@/ui/organisms/RenderResources";
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spacer,
} from "@nextui-org/react";
import moment from "moment";
import { useDispatch } from "react-redux";

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 100px 100px 250px 250px;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
`;

const ModalAsteroid = () => {
	const dispatch = useDispatch();
	const currentAsteroid = useCurrentAsteroid();
	const tasks = useTasks();
	const fleets = useFleetsOnPosition(currentAsteroid?.position);
	const user = useCurrentUser();
	if (!currentAsteroid) {
		return null;
	}
	const { createTask, fetchTasks } = useTasksActions();
	return (
		<>
			<BModal
				size="5xl"
				isOpen={!!currentAsteroid}
				onOpenChange={() => dispatch(setCurrentAsteroid(undefined))}
			>
				<ModalContent>
					<ModalHeader>{currentAsteroid.name ?? "Asteroid"}</ModalHeader>
					<ModalBody>
						<Flex direction="column" alignItems="start" fullWidth>
							<Flex justifyContent="space-between">
								{/* <CanvasContainer>
									<Canvas>
										<ambientLight />
										<pointLight position={[10, 10, 10]} />
										<Suspense fallback={null}>
											<Image3D
												sizeMultiplier={3}
												position={[0, 0, 0]}
												imageUrl={`/images/other/asteroid.png`}
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
											{currentAsteroid.position.system}
											{":"}
											{currentAsteroid.position.systemPosition.x}
											{":"}
											{currentAsteroid.position.systemPosition.y}
											{":"}
											{currentAsteroid.position.systemPosition.z}
										</li>
									</ul>
									<h2>Resources présentes</h2>
									<RenderResources resources={currentAsteroid.resources} />
								</div>
							</Flex>
							<Spacer y={12} />
							<ListFleet
								fleets={fleets}
								additionalRows={(fleet: IFleet) => {
									const isMining = Object.values(tasks).some(
										(task) =>
											task.type === TaskType.COLLECT_ASTEROIDS &&
											task.details?.fleetId === fleet.id &&
											!moment().isAfter(moment(task.endDate)),
									);
									return (
										<CollectButton
											onClick={() => {
												createTask({
													type: TaskType.COLLECT_ASTEROIDS,
													endDate: moment().add(20, "seconds").format(),
													details: {
														asteroidId: currentAsteroid.id,
														fleetId: fleet.id,
													},
													userId: user.id,
												});
												fetchTasks();
											}}
											title={isMining ? "Minage en cours" : "Miner"}
											isDisabled={isMining}
										/>
									);
								}}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<>
							<CloseElementButton
								onClick={() => {
									dispatch(setCurrentAsteroid(undefined));
								}}
							/>
							<SendFleetButton
								onClick={() => {
									dispatch(setCurrentSendPosition(currentAsteroid.position));
								}}
								title="Envoyer une flotte"
							/>
						</>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	);
};

export default ModalAsteroid;
