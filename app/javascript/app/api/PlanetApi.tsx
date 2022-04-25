import Axios from "axios"

const getAllPlanets = async () => {
  const response = await Axios.get(`/api/planets`)
  return response.data
}

export default {
  getAllPlanets,
}
