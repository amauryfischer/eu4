"use client"
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei"
import { Canvas, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber"
import React, { Suspense, useEffect, useRef } from "react"
// @ts-ignore
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook"
import useAsteroids from "@/hooks/data/entity/use-asteroid.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import usePirates from "@/hooks/data/entity/use-pirates.hook"
import * as THREE from "three"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import {
	setCurrentAsteroid,
	setCurrentFleet,
	setCurrentPirate,
	setCurrentPlanet
} from "@/redux/slice/current.slice"
import ShipService from "@/services/ShipService"
import { IPlanet } from "@/type/data/IPlanet"
import { useDispatch } from "react-redux"
import Image3D from "./Image3D"
import Button from "@/ui/atoms/buttons/Button"
import useCurrentUser from "@/hooks/current/use-current-user.hook"

const CanvasContainer = ({ children, cameraRef }) => {
	return (
		<>
			<mesh position={[0, 0, 0]}>
				{/* sphere */}
				<sphereGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color="yellow" />
			</mesh>
			<PerspectiveCamera
				makeDefault
				ref={cameraRef}
				onPointerMissed={() => {}}
				view={null}
				quaternion={null}
				position={[600, 400, 1000]}
				fov={60}
				zoom={10}
				near={0.1} // Adjusted near clipping plane
				far={10000} // Adjusted far clipping plane
			/>
			{children}
		</>
	)
}
const BillboardText = ({ position, children, color = "#ffffff" }) => {
	const textRef = useRef()
	const { camera } = useThree() // Utilisation de useThree pour accéder à la caméra

	useFrame(() => {
		if (textRef.current) {
			const currentLookAt = new THREE.Vector3()
			textRef.current.getWorldPosition(currentLookAt)
			const distance = currentLookAt.distanceTo(camera.position)
			if (distance > 0.1) {
				// Add a small threshold to reduce flickering
				textRef.current.lookAt(camera.position)
			}
		}
	})

	return (
		<Text
			ref={textRef}
			position={position}
			fontSize={2.5}
			color={color}
			anchorX="center"
			anchorY="middle"
		>
			{children}
		</Text>
	)
}
const SolarSystem3D = ({ systemId }: { systemId: string }) => {
	const cameraRef = React.useRef()
	const controlsRef = useRef()
	const fleets = useFleets() ?? {}
	const planets = usePlanets() ?? {}
	const asteroids = useAsteroids() ?? {}
	const pirates = usePirates() ?? {}
	const user = useCurrentUser()
	const ships = useShips()
	const dispatch = useDispatch()
	const fetParcels = useParcelsActions()

	useEffect(() => {
		const fetch = async () => {
			const res = await fetParcels(systemId ?? "")
			console.log(res)
		}
		fetch()
	}, [])

	// zoom to entity
	const zoomToEntity = (position) => {
		if (cameraRef.current && Array.isArray(position) && position.length === 3) {
			const [x, y, z] = position

			if (controlsRef.current) {
				controlsRef.current.target.set(x, y, z)
				controlsRef.current.update()
				// Adjust zoom level to prevent black screen
				cameraRef.current.zoom = 50
				cameraRef.current.updateProjectionMatrix()
			}
		} else {
			console.error("Invalid position passed to zoomToEntity:", position)
		}
	}

	// Fonction pour réinitialiser la caméra
	const resetCamera = () => {
		if (cameraRef.current) {
			cameraRef.current.position.set(600, 400, 1000)
			cameraRef.current.zoom = 10
			cameraRef.current.updateProjectionMatrix()
		}
		if (controlsRef.current) {
			controlsRef.current.target.set(0, 0, 0)
			controlsRef.current.update()
		}
	}

	return (
		<>
			{/* Bouton flottant pour réinitialiser la caméra */}
			<Button
				variant="bordered"
				color="primary"
				style={{ position: "absolute", top: 100, right: 100, zIndex: 1000 }}
				onClick={resetCamera}
			>
				Reset Camera
			</Button>
			<Canvas>
				<CanvasContainer cameraRef={cameraRef}>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Image3D
						position={[0, 0, 0]}
						imageUrl={`/images/planets/sun.jpg`}
						geometry="sphere"
					/>

					<OrbitControls
						ref={controlsRef}
						enableZoom={true}
						makeDefault
						autoRotate
						autoRotateSpeed={0.3}
					/>
					{/* <mesh position={[0, 0, 0]}>
						<boxGeometry args={[100, 100, 100]} />
						<meshStandardMaterial
							color="#255e97"
							// opacity={0.5}
							opacity={0.1}
							transparent
						/>
					</mesh> */}
					{(Object.values(fleets) ?? []).map((fleet) => {
						const { x, y, z } = fleet.position.systemPosition
						if (fleet.position.system?.toString() !== systemId) return null
						const shipId = fleet.shipIds[0]
						const ship = ships?.[shipId]
						if (!ship) {
							return null
						}
						// if another entity same place return null
						if (
							Object.values(planets).some(
								(planet) =>
									planet.position.systemPosition.x == x &&
									planet.position.systemPosition.y == y &&
									planet.position.systemPosition.z == z
							) ||
							Object.values(asteroids).some(
								(asteroid) =>
									asteroid.position.systemPosition.x == x &&
									asteroid.position.systemPosition.y == y &&
									asteroid.position.systemPosition.z == z
							) ||
							Object.values(pirates ?? {}).some(
								(pirate) =>
									pirate.position.systemPosition.x == x &&
									pirate.position.systemPosition.y == y &&
									pirate.position.systemPosition.z == z
							)
						) {
							return null
						}
						const isAtUser = fleet.userId === user?.id
						return (
							<Suspense fallback={null} key={fleet.id}>
								<>
									<Image3D
										position={[x, y, z]}
										imageUrl={
											ShipService.getAllShips()[ships?.[shipId]?.class]?.img
										}
										onClick={(e) => {
											dispatch(setCurrentFleet(fleet.id as string))
											zoomToEntity([x, y, z])
											e.stopPropagation()
										}}
									/>
									{/** fleet name as floating text */}
									<BillboardText
										position={[x, y - 3.5, z]} // Ajustez l'offset selon vos besoins
										color={isAtUser ? "#1469ad" : "#d506fe"}
									>
										{fleet.name}
									</BillboardText>
								</>
							</Suspense>
						)
					})}
					{(Object.values(planets) ?? []).map((planet) => {
						const { x, y, z } = planet?.position?.systemPosition
						if (planet?.position?.system?.toString() !== systemId) return null
						const isAtUser = planet.userId === user?.id
						return (
							<Suspense fallback={null} key={planet.id}>
								<Image3D
									position={[x, y, z]}
									imageUrl={`/images/planets/${planet.type}.jpg`}
									onClick={(e) => {
										zoomToEntity([x, y, z])
										dispatch(setCurrentPlanet(planet.id))
										e.stopPropagation()
									}}
									geometry="sphere"
								/>
								<BillboardText
									color={isAtUser ? "#1469ad" : "#ffffff"}
									position={[x, y - 3.5, z]} // Ajustez l'offset selon vos besoins
								>
									{planet.name}
								</BillboardText>
							</Suspense>
						)
					})}
					{(Object.values(asteroids) ?? []).map((asteroid) => {
						const { x, y, z } = asteroid.position.systemPosition
						if (asteroid.position.system?.toString() !== systemId) return null
						return (
							<Suspense fallback={null} key={asteroid.id}>
								<Image3D
									position={[x, y, z]}
									imageUrl={`/images/other/asteroid.png`}
									onClick={(e) => {
										zoomToEntity([x, y, z])
										dispatch(setCurrentAsteroid(asteroid.id as string))
										e.stopPropagation()
									}}
								/>
							</Suspense>
						)
					})}
					{(Object.values(pirates ?? {}) ?? []).map((pirate) => {
						const { x, y, z } = pirate.position.systemPosition
						if (pirate.position.system?.toString() !== systemId) return null

						return (
							<Suspense fallback={null} key={pirate.id}>
								<Image3D
									position={[x, y, z]}
									imageUrl={`/images/other/pirate.png`}
									onClick={(e) => {
										zoomToEntity([x, y, z])
										dispatch(setCurrentPirate(pirate.id as string))
										e.stopPropagation()
									}}
								/>
								<BillboardText
									position={[x, y - 3.5, z]} // Ajustez l'offset selon vos besoins
									color="#ff0000"
								>
									Pirate niveau {pirate.level}
								</BillboardText>
							</Suspense>
						)
					})}
				</CanvasContainer>
			</Canvas>
		</>
	)
}

export default SolarSystem3D
