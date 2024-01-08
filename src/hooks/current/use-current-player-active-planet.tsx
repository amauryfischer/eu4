import { useSelector } from "react-redux"
import usePlanets from "../data/entity/use-planets.hook"

const useCurrentPlayerActivePlanet = () => {
	const planets = usePlanets()
	const planetId = useSelector(
		(state: any) => state.current.playerActivePlanetId,
	)
	return planets[planetId]
}

export default useCurrentPlayerActivePlanet
