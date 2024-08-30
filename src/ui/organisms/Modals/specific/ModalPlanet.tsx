"use client";
import useCurrentPlanet from "@/hooks/current/use-current-planet.hook";
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook";
import useShips from "@/hooks/data/entity/use-ships.hook";
import {
	setCurrentPlanet,
	setCurrentSendPosition,
} from "@/redux/slice/current.slice";
import Flex from "@/ui/atoms/Flex";
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import BModal from "@/ui/molecules/modal/BModal";
import ListFleet from "@/ui/organisms/ListFleet";
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import Image3D from "@/app/system/[id]/solarSystem/Image3D";

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const ModalPlanet = () => {
	const dispatch = useDispatch();
	const ships = useShips();

	const currentPlanet = useCurrentPlanet();
	const filteredFleets = useFleetsOnPosition(currentPlanet?.position);

	if (!currentPlanet) {
		return null;
	}
	return (
		<>
			<BModal
				size="4xl"
				isOpen={!!currentPlanet}
				title={currentPlanet.name}
				onOpenChange={() => dispatch(setCurrentPlanet(undefined))}
			>
				<ModalContent>
					<ModalHeader>{currentPlanet.name}</ModalHeader>
					<ModalBody>
						<Flex direction="column" alignItems="start" fullWidth>
							{/* <CanvasContainer>
								<Canvas>
									<ambientLight />
									<pointLight position={[10, 10, 10]} />
									<Suspense fallback={null}>
										<Image3D
											sizeMultiplier={3}
											geometry="sphere"
											position={[0, 0, 0]}
											imageUrl={`/images/planets/${currentPlanet.type}.jpg`}
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
								<h2>Coordonnées : </h2>
								<ul>
									<li>
										{currentPlanet.position?.system}
										{":"}
										{currentPlanet.position?.systemPosition?.x}
										{":"}
										{currentPlanet.position?.systemPosition?.y}
										{":"}
										{currentPlanet.position?.systemPosition?.z}
									</li>
								</ul>
							</div>
						</Flex>
						<ListFleet fleets={filteredFleets} />
					</ModalBody>
					<ModalFooter>
						<CloseElementButton
							onPress={() => dispatch(setCurrentPlanet(undefined))}
						/>
						<SendFleetButton
							onPress={() => {
								dispatch(setCurrentSendPosition(currentPlanet.position));
							}}
							title="Envoyer une flotte"
						/>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	);
};

export default ModalPlanet;
