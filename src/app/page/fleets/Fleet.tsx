import useFleets from "@/hooks/data/entity/use-fleets.hook"
import { IFleet } from "@/type/data/IFleet"
import Flex from "@/ui/atoms/Flex/Flex"
import BButton from "@/ui/atoms/buttons/BButton/BButton"
import ListFleet from "@/ui/organisms/ListFleet"
import { useNavigate } from "react-router"

const Fleet = ({ }) => {
	const fleets = useFleets()

	const navigate = useNavigate()
	return (
		<Flex direction="column" gap="2rem">
			<ListFleet fleets={Object.values(fleets)} />
		</Flex>
	)
}

export default Fleet
