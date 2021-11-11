import { useSelector } from "react-redux"

const usePlanets = () => {
  return useSelector((state: any) => state.planets) ?? {}
}
export default usePlanets
