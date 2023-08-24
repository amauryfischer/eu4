import useFleetActions from "@/hooks/data/actions/use-fleets-actions.hook"
import Flex from "@/ui/atoms/Flex/Flex"
import BButton from "@/ui/atoms/buttons/BButton/BButton"
import { Input } from "@nextui-org/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"

const FleetManager = ({}) => {
	const fleets = useSelector((state: any) => state.fleets) ?? {}
	const { id } = useParams()
	const { updateFleet } = useFleetActions()
	const fleet = fleets[id as string]
	const [system, setSystem] = useState(fleet?.data?.position?.system)
	const [x, setX] = useState(fleet?.data?.position?.systemPosition?.x)
	const [y, setY] = useState(fleet?.data?.position?.systemPosition?.y)
	const [z, setZ] = useState(fleet?.data?.position?.systemPosition?.z)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const moveFleet = () => {
		updateFleet(fleet.id, {
			...fleet,
			position: { system, systemPosition: { x, y, z } },
		})
	}

	return (
		<Flex direction="column">
			<BButton variant="outlined" $color="yellow" onClick={() => navigate(-1)}>
				Retour
			</BButton>
			<h1>{fleet?.data?.name}</h1>
			<Input
				label="Systeme solaire"
				value={system}
				onChange={(e) => setSystem(e.target.value)}
			/>
			<Input label="X" value={x} onChange={(e) => setX(e.target.value)} />
			<Input label="Y" onChange={(e) => setY(e.target.value)} value={y} />
			<Input label="Z" onChange={(e) => setZ(e.target.value)} value={z} />
			<BButton variant="contained" $color="yellow" onClick={moveFleet}>
				Déplacer
			</BButton>
		</Flex>
	)
}

export default FleetManager
