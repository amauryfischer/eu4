import { createSlice } from "@reduxjs/toolkit"

export const shipSlice = createSlice({
  name: "ships",
  initialState: {},
  reducers: {
    setShips: (state, { payload: { ships } }) => {
      debugger
      ships.forEach((ship) => {
        state[ship.id] = ship
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { setShips } = shipSlice.actions

export default shipSlice.reducer
