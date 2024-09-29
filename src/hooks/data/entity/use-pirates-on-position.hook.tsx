import { IPosition } from "@/type/data/IPosition"
import usePirates from "./use-pirates.hook"

const usePiratesOnPosition = (position: IPosition) => {
	const pirates = usePirates()
	return Object.values(pirates).filter((pirate) => {
		return (
			pirate.position.systemPosition.x === position?.systemPosition?.x &&
			pirate.position.systemPosition.y === position?.systemPosition?.y &&
			pirate.position.systemPosition.z === position?.systemPosition?.z
		)
	})
}

export default usePiratesOnPosition
