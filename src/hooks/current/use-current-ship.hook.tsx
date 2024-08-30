import { useSelector } from "react-redux"
import useShips from "../data/entity/use-ships.hook"

const useCurrentShip = () => {
	const ships = useShips()
	const shipId = useSelector((state: any) => state.current.shipId)
	return ships?.[shipId]
}

export default useCurrentShip
