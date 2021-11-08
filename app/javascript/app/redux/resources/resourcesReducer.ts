import { createSlice } from "@reduxjs/toolkit"

export const TITANIUM = "TITANIUM"
export const COPPER = "COPPER"
export const IRON = "IRON"
export const GOLD = "GOLD"
export const PLATINUM = "PLATINUM"
export const COAL = "COAL"
export const URANIUM = "URANIUM"
export const ALUMINUM = "ALUMINUM"
export const SILVER = "SILVER"
export const counterSlice = createSlice({
  name: "resources",
  initialState: {
    [TITANIUM]: 0,
    [COPPER]: 0,
    [IRON]: 0,
    [COAL]: 0,
    [URANIUM]: 0,
    [GOLD]: 0,
    [SILVER]: 0,
    [PLATINUM]: 0,
    [ALUMINUM]: 0,
  },
  reducers: {
    addResource: (state, { payload: { type, amount } }) => {
      state[type] += amount
    },
    removeResource: (state, { payload: { type, amount } }) => {
      state[type] -= amount
    },
  },
})

// Action creators are generated for each case reducer function
export const { addResource, removeResource } = counterSlice.actions

export default counterSlice.reducer
