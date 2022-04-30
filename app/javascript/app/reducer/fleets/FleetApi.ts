import Axios from "axios"

const getFleets = async () => {
  const response = await Axios.get("/api/fleets")
  return response.data
}

const createFleet = async (fleet) => {
  const newFleet = await Axios.post("/api/fleets", fleet)
  return newFleet
}

export default {
  getFleets,
  createFleet,
}
