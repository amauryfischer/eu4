import { useSelector } from "react-redux"
import { useParams } from "react-router"
import usePlanets from "../data/entity/use-planets.hook"

const useCurrentUser = () => {
	const user = useSelector((state: any) => state.current.user)
	return user
}

export default useCurrentUser
