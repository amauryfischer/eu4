import { useSelector } from "react-redux"
import useAsteroids from "../data/entity/use-asteroid.hook"

const useCurrentAsteroid = () => {
	const asteroids = useAsteroids()
	const asteroidId = useSelector((state: any) => state.current.asteroidId)
	return asteroids[asteroidId]
}

export default useCurrentAsteroid
