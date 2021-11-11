import { createSlice } from "@reduxjs/toolkit"

export const planetSlice = createSlice({
  name: "planets",
  initialState: {},
  reducers: {
    setPlanets: (state, { payload: { planets } }) => {
      planets.forEach((planet) => {
        state[planet.id] = planet
      })
    },
    setPlanet: (state, { payload: { planet } }) => {
      state[planet.id] = planet
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPlanets, setPlanet } = planetSlice.actions

export default planetSlice.reducer
