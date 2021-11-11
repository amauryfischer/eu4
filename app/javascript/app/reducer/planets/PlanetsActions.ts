import { createAsyncThunk } from "@reduxjs/toolkit"
import PlanetApi from "../../api/PlanetApi"
import { setPlanets } from "./planetReducer"

export const fetchPlanets = createAsyncThunk(
  "planets/fetchAll",
  async (_void, { dispatch }) => {
    const planets = await PlanetApi.getAllPlanets()
    dispatch(setPlanets({ planets }))
  },
)

export default {
  fetchPlanets,
}
