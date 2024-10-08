import { useSelector } from "react-redux"
import useFleets from "../data/entity/use-fleets.hook"

const useCurrentFleet = () => {
	const fleets = useFleets()
	const fleetId = useSelector((state: any) => state.current.fleetId)
	return fleets[fleetId]
}

export default useCurrentFleet
