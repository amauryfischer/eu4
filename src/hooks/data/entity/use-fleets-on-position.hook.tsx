import { IPosition } from "@/type/data/IPosition"
import useFleets from "./use-fleets.hook"

const useFleetsOnPosition = (position: IPosition) => {
	const fleets = useFleets()
	return Object.values(fleets).filter((fleet) => {
		return (
			fleet.position.systemPosition.x === position?.systemPosition?.x &&
			fleet.position.systemPosition.y === position?.systemPosition?.y &&
			fleet.position.systemPosition.z === position?.systemPosition?.z
		)
	})
}

export default useFleetsOnPosition
