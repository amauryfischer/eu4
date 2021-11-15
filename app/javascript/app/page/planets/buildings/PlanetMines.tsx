import React, { useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon"
import {
  OrthographicCamera,
  OrbitControls,
  useTexture,
} from "@react-three/drei"
import * as THREE from "three"
function Sphere({
  speed = 1000,
  radius = 3,
  color = "blue",
  scale = 1,
  image = "2k_mercury",
}) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  }))
  useFrame((state, delta) => {
    api.position.set(
      Math.cos(((Date.now() % speed) / speed) * Math.PI * 2) * radius,
      2,
      -Math.sin(((Date.now() % speed) / speed) * Math.PI * 2) * radius,
    )
  })
  const texture = useTexture(`/images/${image}.jpg`)
  return (
    <mesh
      scale={[scale, scale, scale]}
      receiveShadow
      castShadow
      ref={ref}
      onClick={() => alert("coucou")}
    >
      <sphereGeometry />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
function Cube(props) {
  const [ref] = useBox(() => ({ mass: 10, position: [0, 5, 0], ...props }))
  return (
    <mesh ref={ref} scale={[12, 12, 12]} onClick={() => alert("coucou")}>
      <boxBufferGeometry width={15} height={15} />
      <meshLambertMaterial color={"#aaa5fa"} opacity={0.3} />
    </mesh>
  )
}
export default function App() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Canvas
      style={{
        background: "white",
        height: "900px",
        backgroundImage: "url(/images/star.jpg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} castShadow />
      <Physics gravity={[0, 0, 0]}>
        <Sphere radius={0} speed={35000} scale={4} image="2k_sun" />
        <Sphere radius={10} scale={2} speed={45000} image="2k_neptune" />
        <Sphere radius={40} scale={5} speed={80000} image="2k_jupiter" />
        <Sphere radius={30} speed={240000} image="earthmap1k" />
      </Physics>

      {/**@ @ts-ignore */}
      <OrbitControls
        enabled={!isDragging}
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
    </Canvas>
  )
}
