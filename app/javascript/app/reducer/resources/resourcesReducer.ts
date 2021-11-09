import { createSlice } from "@reduxjs/toolkit"
import {
  ALUMINUM,
  AZOTE,
  CUIVRE,
  FER,
  HYDROGENE,
  SILICIUM,
  TITANE,
  URANIUM,
} from "services/ResourcesService"
export const counterSlice = createSlice({
  name: "resources",
  initialState: {
    [TITANE.name]: 0,
    [AZOTE.name]: 0,
    [ALUMINUM.name]: 0,
    [CUIVRE.name]: 0,
    [FER.name]: 0,
    [URANIUM.name]: 0,
    [HYDROGENE.name]: 0,
    [SILICIUM.name]: 0,
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
