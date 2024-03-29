import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { useEffectOnce } from "react-use"

interface SyncrhoWrapperProps {
	children: React.ReactNode
}
const SynchroWrapper = ({ children }: SyncrhoWrapperProps) => {
	const { fetchPlanets } = usePlanetsActions()
	const { fetchShips } = useShipsActions()
	const { fetchFleets } = useFleetsActions()
	const { fetchTasks } = useTasksActions()
	useEffectOnce(() => {
		fetchPlanets()
		fetchShips()
		fetchFleets()
		fetchTasks()
	})
	return <>{children}</>
}

export default SynchroWrapper
