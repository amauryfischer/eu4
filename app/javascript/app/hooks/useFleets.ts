import { useSelector } from "react-redux"
const useFleets = () => {
  const fleets = useSelector((state: any) => state.fleets)

  return fleets
}
export default useFleets
