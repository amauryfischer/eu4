import ReactDOM from "react-dom"
import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, usePlane, useBox } from "@react-three/cannon"
import useKeyboardJs from "react-use/lib/useKeyboardJs"
import React, { useState, useEffect, useRef } from "react"
import { useDrag } from "@use-gesture/react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  )
}
function Cube(props) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }))
  useFrame((state, delta) => {
    api.position.set(
      Math.cos(((Date.now() % 1000) / 1000) * Math.PI),
      2,
      -Math.sin(((Date.now() % 1000) / 1000) * Math.PI),
    )
  })
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  )
}

const PlanetMines = () => {
  const [cameraPosition, setCameraPosition] = useState([10, 10, -10])
  const [isPressed] = useKeyboardJs("up")
  useEffect(() => {
    if (isPressed) {
      console.log("yeah")
      setCameraPosition([
        cameraPosition[0],
        cameraPosition[1] - 10,
        cameraPosition[2] - 10,
      ])
    }
  }, [isPressed])
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false }}
      camera={{ position: cameraPosition, fov: 45 }}
    >
      <color attach="background" args={["lightblue"]} />
      <ambientLight />

      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Physics gravity={[0, 0, 0]}>
        <Plane position={[0, 0, 0]} />
        <Cube position={[0.1, 5, 0]} />
      </Physics>
    </Canvas>
  )
}
export default PlanetMines
