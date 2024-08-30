import useCurrentPirate from "@/hooks/current/use-current-pirate.hook";
import {
	setCurrentPirate,
	setCurrentSendPosition,
} from "@/redux/slice/current.slice";
import Flex from "@/ui/atoms/Flex";
import BButton from "@/ui/atoms/buttons/BButton";
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import { Dialog } from "@mui/material";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spacer,
} from "@nextui-org/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Image3D from "../solarSystem/Image3D";
import ListFleet from "@/ui/organisms/ListFleet";
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook";
import { IFleet } from "@/type/data/IFleet";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import AttackButton from "@/ui/atoms/buttons/AttackButton";
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

const ModalPirate = () => {
	const dispatch = useDispatch();
	const pirate = useCurrentPirate();
	const fleets = useFleetsOnPosition(pirate?.position);
	if (!pirate) {
		return null;
	}
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
								<CanvasContainer>
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
								</CanvasContainer>
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
								additionalRows={(fleet: IFleet) => (
									<AttackButton onClick={() => {}} title="Attaquer" />
								)}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<CloseElementButton
							onClick={() => {
								dispatch(setCurrentPirate(undefined));
							}}
						/>
						<SendFleetButton
							onClick={() => {
								dispatch(setCurrentSendPosition(pirate.position));
							}}
							title="Envoyer une flotte"
						/>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	);
};

export default ModalPirate;
