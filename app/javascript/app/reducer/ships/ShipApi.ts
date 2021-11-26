import Axios from "axios"

const getShips = async () => {
  const ships = await Axios.get("/api/ships")
  return ships
}

const createShip = async (ship) => {
  const newShip = await Axios.post("/api/ships", ship)
  return newShip
}

export default {
  getShips,
  createShip,
}
