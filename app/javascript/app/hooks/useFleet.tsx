import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { IFleet } from "type/IFleet"

const useFleet: () => IFleet = () => {
  const fleets = useSelector((state: any) => state.fleets) ?? {}
  const { id } = useParams()

  return fleets[id]
}
export default useFleet
