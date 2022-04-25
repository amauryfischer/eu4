import Axios from "axios"

const getShips = async () => {
  const response = await Axios.get("/api/ships")
  return response.data
}

const createShip = async (ship) => {
  const newShip = await Axios.post("/api/ships", ship)
  return newShip
}

export default {
  getShips,
  createShip,
}
