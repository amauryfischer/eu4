import Axios from "axios"

const getFleets = async () => {
  const response = await Axios.get("/api/fleets")
  return response.data
}

const createFleet = async (fleet) => {
  const newFleet = await Axios.post("/api/fleets", fleet)
  return newFleet
}
const updateFleet = async (fleet) => {
  const updatedFleet = await Axios.put(`/api/fleets/${fleet.id}`, fleet)
  return updatedFleet
}

export default {
  getFleets,
  createFleet,
  updateFleet,
}
