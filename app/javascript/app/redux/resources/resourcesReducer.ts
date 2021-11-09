import { createSlice } from "@reduxjs/toolkit"

export const TITANIUM = "TITANIUM"
export const COPPER = "COPPER"
export const IRON = "IRON"
export const ALUMINUM = "ALUMINUM"
export const URANIUM = "URANIUM"
export const MERCURE = "MERCURE"
export const SILICIUM = "SILICIUM"
export const KRYPTON = "KRYPTON"
export const AZOTE = "AZOTE"
export const HYDROGENE = "HYDROGENE"
export const counterSlice = createSlice({
  name: "resources",
  initialState: {
    [TITANIUM]: 0,
    [COPPER]: 0,
    [IRON]: 0,
    [ALUMINUM]: 0,
    [MERCURE]: 0,
    [SILICIUM]: 0,
    [URANIUM]: 0,
    [KRYPTON]: 0,
    [AZOTE]: 0,
    [HYDROGENE]: 0,
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
