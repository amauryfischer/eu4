import { createSlice } from "@reduxjs/toolkit"

export const currentSlice = createSlice({
  name: "current",
  initialState: {
    planetId: 0,
  },
  reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = currentSlice.actions

export default currentSlice.reducer
