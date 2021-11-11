import React, { useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon"
import {
  OrthographicCamera,
  OrbitControls,
  useTexture,
} from "@react-three/drei"
import * as THREE from "three"
function Sphere({ speed = 1000, radius = 3, color = "blue" }) {
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
  const texture = useTexture(`/images/earthmap1k.jpg`)
  return (
    <mesh
      scale={[2, 2, 2]}
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
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

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
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={1512}
        shadow-mapSize-width={1512}
      />
      <Physics gravity={[0, 0, 0]}>
        <Sphere radius={0} color="yellow" />
        <Sphere radius={5} color="red" />
        <Sphere radius={8} speed={1500} />
        <Sphere radius={12} speed={7000} color="green" />
      </Physics>

      {/**@ @ts-ignore */}
      <OrthographicCamera
        makeDefault
        zoom={0.03}
        position={[100, 100, -1500]}
        key={""}
        view={undefined}
        bottom={undefined}
        left={undefined}
        right={undefined}
        top={undefined}
        attach={undefined}
        attachArray={undefined}
        attachObject={undefined}
        args={undefined}
        onUpdate={undefined}
        visible={undefined}
        type={undefined}
        id={undefined}
        uuid={undefined}
        name={undefined}
        parent={undefined}
        modelViewMatrix={undefined}
        normalMatrix={undefined}
        matrixWorld={undefined}
        matrixAutoUpdate={undefined}
        matrixWorldNeedsUpdate={undefined}
        castShadow={undefined}
        receiveShadow={undefined}
        frustumCulled={undefined}
        renderOrder={undefined}
        animations={undefined}
        userData={undefined}
        customDepthMaterial={undefined}
        customDistanceMaterial={undefined}
        isObject3D={undefined}
        onBeforeRender={undefined}
        onAfterRender={undefined}
        applyMatrix4={undefined}
        applyQuaternion={undefined}
        setRotationFromAxisAngle={undefined}
        setRotationFromEuler={undefined}
        setRotationFromMatrix={undefined}
        setRotationFromQuaternion={undefined}
        rotateOnAxis={undefined}
        rotateOnWorldAxis={undefined}
        rotateX={undefined}
        rotateY={undefined}
        rotateZ={undefined}
        translateOnAxis={undefined}
        translateX={undefined}
        translateY={undefined}
        translateZ={undefined}
        localToWorld={undefined}
        worldToLocal={undefined}
        lookAt={undefined}
        add={undefined}
        remove={undefined}
        clear={undefined}
        getObjectById={undefined}
        getObjectByName={undefined}
        getObjectByProperty={undefined}
        getWorldPosition={undefined}
        getWorldQuaternion={undefined}
        getWorldScale={undefined}
        getWorldDirection={undefined}
        raycast={undefined}
        traverse={undefined}
        traverseVisible={undefined}
        traverseAncestors={undefined}
        updateMatrix={undefined}
        updateMatrixWorld={undefined}
        updateWorldMatrix={undefined}
        toJSON={undefined}
        clone={undefined}
        copy={undefined}
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
        isOrthographicCamera={undefined}
        near={undefined}
        far={undefined}
        updateProjectionMatrix={undefined}
        setViewOffset={undefined}
        clearViewOffset={undefined}
        matrixWorldInverse={undefined}
        projectionMatrix={undefined}
        projectionMatrixInverse={undefined}
        isCamera={undefined}
      />
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
