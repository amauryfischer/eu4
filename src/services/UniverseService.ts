import FleetService from "@/services/FleetService"
import ShipService from "@/services/ShipService"
import { IFleet } from "@/type/data/IFleet"
import { IModifier } from "@/type/data/IModule"
import { IPosition } from "@/type/data/IPosition"
import IShip from "@/type/data/IShip"

export const WARP_MULTIPLIER = 400
export const IMPULSION_MULTIPLIER = 100

const getDistance = ({
	positionInitial,
	positionFinal,
	ships,
}: {
	positionInitial: IPosition
	positionFinal: IPosition
	ships: Array<IShip>
}) => {
	const initialSolarSystemAB = parseInt(
		`${positionInitial.system.toString()[0]}${
			positionInitial.system.toString()[1]
		}`,
	)
	const initialSolarSystemCD = parseInt(
		`${positionInitial.system.toString()[2]}${
			positionInitial.system.toString()[3]
		}`,
	)
	const finalSolarSystemAB = parseInt(
		`${positionFinal.system.toString()[0]}${
			positionFinal.system.toString()[1]
		}`,
	)
	const finalSolarSystemCD = parseInt(
		`${positionFinal.system.toString()[2]}${
			positionFinal.system.toString()[3]
		}`,
	)
	const warpSpeed = FleetService.getFleetStats({
		ships,
		modifier: IModifier.WARP,
	})

	const impulSpeed = FleetService.getFleetStats({
		ships,
		modifier: IModifier.IMPULSION,
	})

	const warpDistance =
		Math.abs(initialSolarSystemAB - finalSolarSystemAB) +
		Math.abs(initialSolarSystemCD - finalSolarSystemCD)

	if (warpDistance > 0) {
		const timeToAdd =
			(warpDistance / warpSpeed) * WARP_MULTIPLIER +
			(50 / impulSpeed) * IMPULSION_MULTIPLIER
		return {
			warpDistance: warpDistance,
			impulsionDistance: 50,
			timeToAdd,
		}
	}

	const impulsionDistance =
		Math.abs(
			positionInitial.systemPosition.x - positionFinal.systemPosition.x,
		) +
		Math.abs(
			positionInitial.systemPosition.y - positionFinal.systemPosition.y,
		) +
		Math.abs(positionInitial.systemPosition.z - positionFinal.systemPosition.z)

	const timeToAdd = (impulsionDistance / impulSpeed) * IMPULSION_MULTIPLIER

	return {
		warpDistance: 0,
		impulsionDistance,
		timeToAdd,
	}
}

export default { getDistance }
