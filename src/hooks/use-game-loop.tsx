import useFleetsActions from "./data/actions/use-fleets-actions.hook"
import usePlanetsActions from "./data/actions/use-planets-actions.hook"
import useShipsActions from "./data/actions/use-ships-actions.hook"

const useGameLoop = () => {
	const { fetchFleets } = useFleetsActions()
	const { fetchShips } = useShipsActions()
	const { fetchPlanets } = usePlanetsActions()

	return () => {
		fetchPlanets()
	}
}

export default useGameLoop
