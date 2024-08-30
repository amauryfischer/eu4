import IAsteroid from "@/type/data/IAsteroid"
import useData from "../generic/use-data.hook"

const useAsteroids = useData("Asteroid") as () => Record<string, IAsteroid>
export default useAsteroids
