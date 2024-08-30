import useFleetActions from "@/hooks/data/actions/use-fleets-actions.hook"
import Button from "@/ui/atoms/buttons/Button"
import Flex from "@/ui/atoms/Flex/Flex"
import { Input } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const FleetManager = () => {
	const fleets = useSelector((state: any) => state.fleets) ?? {}
	const { id } = useParams()
	const { updateFleet } = useFleetActions()
	const fleet = fleets[id as string]
	const [system, setSystem] = useState(fleet?.data?.position?.system)
	const [x, setX] = useState(fleet?.data?.position?.systemPosition?.x)
	const [y, setY] = useState(fleet?.data?.position?.systemPosition?.y)
	const [z, setZ] = useState(fleet?.data?.position?.systemPosition?.z)

	const moveFleet = () => {
		updateFleet(fleet.id, {
			...fleet,
			position: { system, systemPosition: { x, y, z } },
		})
	}

	return (
		<Flex direction="column">
			<h1>{fleet?.data?.name}</h1>
			<Input
				label="Systeme solaire"
				value={system}
				onChange={(e) => setSystem(e.target.value)}
				variant="bordered"
			/>
			<Input
				label="X"
				value={x}
				onChange={(e) => setX(e.target.value)}
				variant="bordered"
			/>
			<Input
				label="Y"
				onChange={(e) => setY(e.target.value)}
				value={y}
				variant="bordered"
			/>
			<Input
				label="Z"
				onChange={(e) => setZ(e.target.value)}
				value={z}
				variant="bordered"
			/>
			<Button variant="bordered" color="yellow" onClick={moveFleet}>
				Déplacer
			</Button>
		</Flex>
	)
}

export default FleetManager
