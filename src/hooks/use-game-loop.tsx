import useFleetsActions from "./data/actions/use-fleets-actions.hook"
import usePlanetsActions from "./data/actions/use-planets-actions.hook"
import useShipsActions from "./data/actions/use-ships-actions.hook"
import useTasksActions from "./data/actions/use-tasks-actions.hook"

const useGameLoop = () => {
	const { fetchFleets } = useFleetsActions()
	const { fetchShips } = useShipsActions()
	const { fetchPlanets } = usePlanetsActions()
	const { fetchTasks } = useTasksActions()
	return () => {
		fetchPlanets()
		fetchShips()
		fetchFleets()
		fetchTasks()
	}
}

export default useGameLoop
