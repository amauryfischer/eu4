import { IPosition } from "type/IPosition"
import Axios from "axios"

const getParcelDetails = async (system: string) => {
  return await Axios.get(`/api/parcelDetails/${system}`)
}

export default {
  getParcelDetails,
}
