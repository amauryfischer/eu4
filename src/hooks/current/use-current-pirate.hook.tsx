import { useSelector } from "react-redux"
import usePirates from "../data/entity/use-pirates.hook"

const useCurrentPirate = () => {
	const pirates = usePirates()
	const pirateId = useSelector((state: any) => state.current.pirateId)
	return pirates[pirateId]
}

export default useCurrentPirate
