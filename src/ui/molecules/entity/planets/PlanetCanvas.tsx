import Image3D from "@/app/system/[id]/solarSystem/Image3D";
import { IPlanet } from "@/type/data/IPlanet";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const PlanetCanvas = ({
	planet,
	sizeMultiplier = 3,
}: { planet: IPlanet; sizeMultiplier?: number }) => {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<Image3D
					sizeMultiplier={sizeMultiplier}
					geometry="sphere"
					position={[0, 0, 0]}
					imageUrl={`/images/planets/${planet.type}.jpg`}
				/>
			</Suspense>
			<OrbitControls
				enableZoom={true}
				makeDefault
				autoRotate
				autoRotateSpeed={1}
			/>
		</Canvas>
	);
};

export default PlanetCanvas;
