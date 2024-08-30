"use client";
import {
	OrbitControls,
	PerspectiveCamera,
	Text,
	Text3D,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
// @ts-ignore
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook";
import useAsteroids from "@/hooks/data/entity/use-asteroid.hook";
import useFleets from "@/hooks/data/entity/use-fleets.hook";
import usePirates from "@/hooks/data/entity/use-pirates.hook";
import usePlanets from "@/hooks/data/entity/use-planets.hook";
import useShips from "@/hooks/data/entity/use-ships.hook";
import {
	setCurrentAsteroid,
	setCurrentFleet,
	setCurrentPirate,
	setCurrentPlanet,
} from "@/redux/slice/current.slice";
import ShipService from "@/services/ShipService";
import { useDispatch } from "react-redux";
import Image3D from "./Image3D";
import useTasks from "@/hooks/data/entity/use-tasks.hook";
import { CardBody, ScrollShadow } from "@nextui-org/react";
import ListTask from "@/ui/organisms/entity/task/ListTask/ListTask";
import { IPlanet } from "@/type/data/IPlanet";

const CanvasContainer = ({ children }) => {
	return (
		<>
			<mesh position={[0, 0, 0]}>
				{/* sphere */}
				<sphereGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color="yellow" />
			</mesh>
			<PerspectiveCamera
				makeDefault
				onPointerMissed={() => {}}
				view={null}
				quaternion={null}
				position={[600, 400, 1000]}
				fov={60}
				zoom={10}
			/>
			{children}
		</>
	);
};
const BillboardText = ({ position, children }) => {
	const textRef = useRef();
	const { camera } = useThree(); // Utilisation de useThree pour accéder à la caméra

	useFrame(() => {
		if (textRef.current) {
			textRef.current.lookAt(camera.position);
		}
	});

	return (
		<Text
			ref={textRef}
			position={position}
			fontSize={2.5}
			color="#ffffff"
			anchorX="center"
			anchorY="middle"
		>
			{children}
		</Text>
	);
};
const SolarSystem3D = ({ systemId }: { systemId: string }) => {
	const cameraRef = React.useRef();
	const fleets = useFleets() ?? {};
	const planets = usePlanets() ?? {};
	const asteroids = useAsteroids() ?? {};
	const pirates = usePirates() ?? {};
	const [newFocus, setNewFocus] = React.useState([0, 0, 0]);

	const ships = useShips();
	const dispatch = useDispatch();
	const fetParcels = useParcelsActions();

	useEffect(() => {
		const fetch = async () => {
			const res = await fetParcels(systemId ?? "");
			console.log(res);
		};
		fetch();
	}, []);

	// zoom to planet
	const zoomToPlanet = (planet: IPlanet) => {
		const { x, y, z } = planet.position.systemPosition;
		// @ts-ignore
		setNewFocus(x, y, z);
	};

	return (
		<>
			<Canvas>
				<CanvasContainer>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />

					<Image3D
						position={[0, 0, 0]}
						imageUrl={`/images/planets/sun.jpg`}
						geometry="sphere"
					/>
					{/* @ts-ignore */}

					<OrbitControls
						enableZoom={true}
						makeDefault
						autoRotate
						autoRotateSpeed={0.3}
					/>
					{/*
        Universe cube
        */}
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[100, 100, 100]} />
						<meshStandardMaterial
							color="#255e97"
							// opacity={0.5}
							opacity={0.1}
							transparent
						/>
					</mesh>
					{(Object.values(fleets) ?? []).map((fleet) => {
						const { x, y, z } = fleet.position.systemPosition;
						if (fleet.position.system != id) return null;
						const shipId = fleet.shipIds[0];
						const allShips = ShipService.getAllShips();
						const ship = ships?.[shipId];
						if (!ship) {
							return null;
						}
						// if another entity same place return null
						if (
							Object.values(planets).some(
								(planet) =>
									planet.position.systemPosition.x == x &&
									planet.position.systemPosition.y == y &&
									planet.position.systemPosition.z == z,
							) ||
							Object.values(asteroids).some(
								(asteroid) =>
									asteroid.position.systemPosition.x == x &&
									asteroid.position.systemPosition.y == y &&
									asteroid.position.systemPosition.z == z,
							) ||
							Object.values(pirates ?? {}).some(
								(pirate) =>
									pirate.position.systemPosition.x == x &&
									pirate.position.systemPosition.y == y &&
									pirate.position.systemPosition.z == z,
							)
						) {
							return null;
						}
						return (
							<Suspense fallback={null} key={fleet.id}>
								<>
									<Image3D
										position={[x, y, z]}
										imageUrl={
											ShipService.getAllShips()[ships?.[shipId]?.class]?.img
										}
										onClick={(e) => {
											dispatch(setCurrentFleet(fleet.id as string));
											e.stopPropagation();
										}}
									/>
									{/** fleet name as floating text */}
									<BillboardText
										position={[x, y - 3.5, z]} // Ajustez l'offset selon vos besoins
									>
										{fleet.name}
									</BillboardText>
								</>
							</Suspense>
						);
					})}
					{(Object.values(planets) ?? []).map((planet) => {
						const { x, y, z } = planet?.position?.systemPosition;
						if (planet?.position?.system?.toString() !== systemId) return null;

						return (
							<Suspense fallback={null} key={planet.id}>
								<Image3D
									position={[x, y, z]}
									imageUrl={`/images/planets/${planet.type}.jpg`}
									onClick={(e) => {
										zoomToPlanet(planet);
										dispatch(setCurrentPlanet(planet.id));
										e.stopPropagation();
									}}
									geometry="sphere"
								/>
								<BillboardText
									position={[x, y - 3.5, z]} // Ajustez l'offset selon vos besoins
								>
									{planet.name}
								</BillboardText>
							</Suspense>
						);
					})}
					{(Object.values(asteroids) ?? []).map((asteroid) => {
						const { x, y, z } = asteroid.position.systemPosition;

						if (asteroid.position.system !== systemId) return null;
						return (
							<Suspense fallback={null} key={asteroid.id}>
								<Image3D
									position={[x, y, z]}
									imageUrl={`/images/other/asteroid.png`}
									onClick={(e) => {
										dispatch(setCurrentAsteroid(asteroid.id as string));
										e.stopPropagation();
									}}
								/>
							</Suspense>
						);
					})}
					{(Object.values(pirates ?? {}) ?? []).map((pirate) => {
						const { x, y, z } = pirate.position.systemPosition;
						if (pirate.position.system !== systemId) return null;

						return (
							<Suspense fallback={null} key={pirate.id}>
								<Image3D
									position={[x, y, z]}
									imageUrl={`/images/other/pirate.png`}
									onClick={(e) => {
										dispatch(setCurrentPirate(pirate.id as string));
										e.stopPropagation();
									}}
								/>
							</Suspense>
						);
					})}
				</CanvasContainer>
			</Canvas>
		</>
	);
};

export default SolarSystem3D;
