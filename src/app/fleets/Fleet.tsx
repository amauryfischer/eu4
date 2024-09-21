"use client"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import { IFleet } from "@/type/data/IFleet"
import Flex from "@/ui/atoms/Flex/Flex"
import ListFleet from "@/ui/organisms/entity/fleet/ListFleet"

const Fleet = () => {
	const fleets = useFleets()

	return (
		<Flex direction="column" gap="2rem">
			<ListFleet fleets={Object.values(fleets)} />
		</Flex>
	)
}

export default Fleet
