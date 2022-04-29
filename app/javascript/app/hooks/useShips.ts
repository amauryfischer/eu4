import { useSelector } from "react-redux"

const useShips = () => {
  return useSelector((state: any) => state.ships) ?? {}
}
export default useShips
