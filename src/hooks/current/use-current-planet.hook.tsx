import { useSelector } from "react-redux"
import { useParams } from "react-router"
import usePlanets from "../data/entity/use-planets.hook"

const useCurrentPlanet = () => {
	const planets = usePlanets()
	const planetId = useSelector((state: any) => state.current.planetId)
	return planets?.[planetId]
}

export default useCurrentPlanet
