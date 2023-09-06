import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { Suspense, useEffect } from "react"
import { useParams } from "react-router-dom"
// @ts-ignore
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook"
import useAsteroids from "@/hooks/data/entity/use-asteroid.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import usePirates from "@/hooks/data/entity/use-pirates.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import {
	setCurrentAsteroid,
	setCurrentFleet,
	setCurrentPirate,
	setCurrentPlanet,
} from "@/redux/slice/current.slice"
import ShipService from "@/services/ShipService"
import { useDispatch } from "react-redux"
import Image3D from "./Image3D"

const SolarSystem3D = () => {
	const { id } = useParams<string>()
	const cameraRef = React.useRef()
	const fleets = useFleets() ?? {}
	const planets = usePlanets() ?? {}
	const asteroids = useAsteroids() ?? {}
	const pirates = usePirates() ?? {}

	const ships = useShips()
	const dispatch = useDispatch()
	const fetParcels = useParcelsActions()

	useEffect(() => {
		const fetch = async () => {
			const res = await fetParcels(id ?? "")
			console.log(res)
		}
		fetch()
	}, [])

	return (
		<>
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<mesh position={[0, 0, 0]}>
					{/* sphere */}
					<sphereGeometry args={[1, 32, 32]} />
					<meshStandardMaterial color="yellow" />
				</mesh>
				<Suspense fallback={null}>
					<Image3D
						position={[0, 0, 0]}
						imageUrl={`/images/planets/sun.jpg`}
						geometry="sphere"
					/>
				</Suspense>
				{/* @ts-ignore */}
				<PerspectiveCamera
					ref={cameraRef}
					makeDefault
					onPointerMissed={() => {}}
					view={null}
					quaternion={null}
					position={[600, 400, 1000]}
					fov={60}
					zoom={10}
				/>
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
					const { x, y, z } = fleet.position.systemPosition
					if (fleet.position.system != id) return null
					const shipId = fleet.shipIds[0]
					const allShips = ShipService.getAllShips()
					const ship = ships?.[shipId]
					if (!ship) {
						return null
					}
					return (
						<Suspense fallback={null} key={fleet.id}>
							<Image3D
								position={[x, y, z]}
								imageUrl={
									ShipService.getAllShips()[ships?.[shipId]?.class]?.img
								}
								onClick={(e) => {
									dispatch(setCurrentFleet(fleet.id as string))
									e.stopPropagation()
								}}
							/>
						</Suspense>
					)
				})}
				{(Object.values(planets) ?? []).map((planet) => {
					const { x, y, z } = planet?.position?.systemPosition
					if (planet?.position?.system?.toString() !== id) return null

					return (
						<Suspense fallback={null} key={planet.id}>
							<Image3D
								position={[x, y, z]}
								imageUrl={`/images/planets/${planet.type}.jpg`}
								onClick={(e) => {
									dispatch(setCurrentPlanet(planet.id))
									e.stopPropagation()
								}}
								geometry="sphere"
							/>
						</Suspense>
					)
				})}
				{(Object.values(asteroids) ?? []).map((asteroid) => {
					const { x, y, z } = asteroid.position.systemPosition

					if (asteroid.position.system != id) return null
					return (
						<Suspense fallback={null} key={asteroid.id}>
							<Image3D
								position={[x, y, z]}
								imageUrl={`/images/other/asteroid.png`}
								onClick={(e) => {
									dispatch(setCurrentAsteroid(asteroid.id as string))
									e.stopPropagation()
								}}
							/>
						</Suspense>
					)
				})}
				{(Object.values(pirates ?? {}) ?? []).map((pirate) => {
					const { x, y, z } = pirate.position.systemPosition
					if (pirate.position.system != id) return null

					return (
						<Suspense fallback={null} key={pirate.id}>
							<Image3D
								position={[x, y, z]}
								imageUrl={`/images/other/pirate.png`}
								onClick={(e) => {
									dispatch(setCurrentPirate(pirate.id as string))
									e.stopPropagation()
								}}
							/>
						</Suspense>
					)
				})}
			</Canvas>
		</>
	)
}

export default SolarSystem3D
