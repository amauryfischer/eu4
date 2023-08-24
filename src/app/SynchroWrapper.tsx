import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import { useEffectOnce } from "react-use"

interface SyncrhoWrapperProps {
	children: React.ReactNode
}
const SynchroWrapper = ({ children }: SyncrhoWrapperProps) => {
	const { fetchPlanets } = usePlanetsActions()
	useEffectOnce(() => {
		fetchPlanets()
	})
	return <>{children}</>
}

export default SynchroWrapper
