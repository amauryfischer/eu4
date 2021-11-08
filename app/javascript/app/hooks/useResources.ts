import { useSelector } from "react-redux"

const useResources = () => {
  return useSelector((state: any) => state.resources) ?? {}
}
export default useResources
