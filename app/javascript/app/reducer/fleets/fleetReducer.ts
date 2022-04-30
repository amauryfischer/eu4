import { createSlice } from "@reduxjs/toolkit"

export const fleetSlice = createSlice({
  name: "fleets",
  initialState: {},
  reducers: {
    setFleets: (state, { payload: { fleets } }) => {
      fleets.forEach((fleet) => {
        state[fleet.id] = fleet
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFleets } = fleetSlice.actions

export default fleetSlice.reducer
