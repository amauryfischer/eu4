import SolarSystem3D from "./solarSystem/SolarSystem3D";

export default function SystemId({ params }: { params: { id: string } }) {
	const systemId = params.id as string;
	return <SolarSystem3D systemId={systemId} />;
}
