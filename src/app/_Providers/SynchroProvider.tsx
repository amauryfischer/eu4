import useCurrentUser from "@/hooks/current/use-current-user.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useUserActions from "@/hooks/data/actions/use-user-actions.hook"
import { useEffect } from "react"

interface SynchroProviderProps {
	children: React.ReactNode
}
const SynchroProvider = ({ children }: SynchroProviderProps) => {
	const { fetchPlanets } = usePlanetsActions()
	const { fetchShips } = useShipsActions()
	const { fetchFleets } = useFleetsActions()
	const { fetchTasks } = useTasksActions()
	const { fetchUser } = useUserActions()
	useEffect(() => {
		fetchPlanets()
		fetchShips()
		fetchFleets()
		fetchTasks()
		fetchUser()
	}, [])
	return <>{children}</>
}

export default SynchroProvider
