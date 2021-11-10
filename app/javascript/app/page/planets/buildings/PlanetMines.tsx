import ReactDOM from "react-dom"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import useKeyboardJs from "react-use/lib/useKeyboardJs"
import React, { useState, useEffect, useRef } from "react"
import { useDrag } from "@use-gesture/react"
import {
  FlyControls,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"

import { useGesture } from "react-use-gesture"
import clamp from "lodash/clamp"
function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  )
}
function Sphere({ speed = 1000, radius = 3, color = "blue" }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
  }))
  useFrame((state, delta) => {
    api.position.set(
      Math.cos(((Date.now() % speed) / speed) * Math.PI * 2) * radius,
      2,
      -Math.sin(((Date.now() % speed) / speed) * Math.PI * 2) * radius,
    )
  })
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <sphereGeometry />
      <meshLambertMaterial color={color} />
    </mesh>
  )
}

function Controls() {
  const [isPressedUp] = useKeyboardJs("up")
  const [isPressedDown] = useKeyboardJs("down")
  const ref = useRef()
  const { camera } = useThree()
  useFrame(() => {
    if (isPressedUp) {
      camera.position.z = camera.position.z + 0.1
    }
    if (isPressedDown) {
      camera.position.z = camera.position.z - 0.1
    }
    camera.updateMatrixWorld()
  })
  // @ts-ignore
  return <camera ref={ref} args={[camera]} />
}
const PlanetMines = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }}>
      <ambientLight />
      <Controls />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Physics gravity={[0, 0, 0]}>
        <Sphere radius={0} color="yellow" />
        <Sphere radius={5} color="red" />
        <Sphere radius={8} speed={1500} />
        <Sphere radius={12} speed={7000} color="green" />
      </Physics>
    </Canvas>
  )
}
export default PlanetMines
