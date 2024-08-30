import styled from "styled-components";
import React, { Suspense } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import Image3D from "../solarSystem/Image3D";
import { OrbitControls } from "@react-three/drei";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spacer,
} from "@nextui-org/react";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import Flex from "@/ui/atoms/Flex";
import {
	setCurrentAsteroid,
	setCurrentSendPosition,
} from "@/redux/slice/current.slice";
import useCurrentAsteroid from "@/hooks/current/use-current-asteroid.hook";
import useShips from "@/hooks/data/entity/use-ships.hook";
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook";
import ListFleet from "@/ui/organisms/ListFleet";
import BButton from "@/ui/atoms/buttons/BButton";
import { IFleet } from "@/type/data/IFleet";
import RenderResources from "@/ui/organisms/RenderResources";
import Mine from "@/ui/fondations/icons/Mine";
import CollectButton from "@/ui/atoms/buttons/CollectButton";
import { TaskType } from "@/type/data/ITask";
import moment from "moment";
import RUBY_DATE_FORMAT from "@/utils/rubyDateFormat";
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook";
import useCurrentUser from "@/hooks/current/use-current-user.hook";
import useTasks from "@/hooks/data/entity/use-tasks.hook";
import BModal from "@/ui/molecules/modal/BModal";

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: var(--grey800) !important;
    color: white !important;
    min-width: 1200px !important;
  }
`;

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
								<CanvasContainer>
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
								</CanvasContainer>
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
