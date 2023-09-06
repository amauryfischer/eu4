import { ThreeEvent, useLoader } from "@react-three/fiber"
import React from "react"
import * as THREE from "three"
// @ts-ignore
import { Texture } from "three"

const Image3D = ({
	position,
	imageUrl,
	onClick = (_e: ThreeEvent<MouseEvent>) => {},
	geometry = "box",
	sizeMultiplier = 1,
}) => {
	const texture = useLoader(THREE.TextureLoader, imageUrl) as Texture
	return (
		<mesh onClick={onClick} position={position}>
			{geometry === "box" ? (
				<boxGeometry
					attach="geometry"
					args={[1 * sizeMultiplier, 1 * sizeMultiplier, 1 * sizeMultiplier]}
				/>
			) : (
				<sphereGeometry attach="geometry" args={[1 * sizeMultiplier, 32, 32]} />
			)}
			<meshBasicMaterial attach="material" map={texture} toneMapped={false} />
		</mesh>
	)
}

export default Image3D
