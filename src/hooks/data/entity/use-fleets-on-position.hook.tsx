import { IPosition } from "@/type/data/IPosition"
import useFleets from "./use-fleets.hook"

const useFleetsOnPosition = (position: IPosition) => {
	const fleets = useFleets()
	return Object.values(fleets).filter(
		(fleet) =>
			fleet.data.position.systemPosition.x === position.systemPosition.x &&
			fleet.data.position.systemPosition.y === position.systemPosition.y &&
			fleet.data.position.systemPosition.z === position.systemPosition.z,
	)
}

export default useFleetsOnPosition
