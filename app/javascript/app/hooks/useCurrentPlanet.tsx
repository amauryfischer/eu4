import { useParams } from "react-router"
import usePlanets from "./usePlanets"

const useCurrentPlanet = () => {
  const planets = usePlanets()
  const { id } = useParams()

  return planets[id]
}

export default useCurrentPlanet
