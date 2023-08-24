import useFleets from "@/hooks/data/entity/use-fleets.hook"
import { IFleet } from "@/type/data/IFleet"
import Flex from "@/ui/atoms/Flex/Flex"
import BButton from "@/ui/atoms/buttons/BButton/BButton"
import { useNavigate } from "react-router"

const Fleet = ({}) => {
	const fleets = useFleets()

	const navigate = useNavigate()
	return (
		<Flex direction="column" gap="2rem">
			{Object.values(fleets).map((fleet: IFleet) => (
				<Flex justifyContent="space-between" key={fleet.id}>
					<div>{fleet.data.name}</div>
					<BButton
						variant="outlined"
						$color="yellow"
						onClick={() => {
							navigate(`/fleets/manager/${fleet.id}`)
						}}
					>
						Gérer
					</BButton>
				</Flex>
			))}
		</Flex>
	)
}

export default Fleet
