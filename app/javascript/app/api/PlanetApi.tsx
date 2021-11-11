import Axios from "axios"

const getPlanetResources = () => {}

const getAllPlanets = async () => {
  const planets = await Axios.get(`/api/planets`)
  return planets.data
}

export default {
  getAllPlanets,
}
