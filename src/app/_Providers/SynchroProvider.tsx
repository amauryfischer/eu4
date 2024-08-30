import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook";
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook";
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook";
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook";
import { useEffect } from "react";

interface SynchroProviderProps {
	children: React.ReactNode;
}
const SynchroProvider = ({ children }: SynchroProviderProps) => {
	const { fetchPlanets } = usePlanetsActions();
	const { fetchShips } = useShipsActions();
	const { fetchFleets } = useFleetsActions();
	const { fetchTasks } = useTasksActions();
	useEffect(() => {
		fetchPlanets();
		fetchShips();
		fetchFleets();
		fetchTasks();
	}, []);
	return <>{children}</>;
};

export default SynchroProvider;
