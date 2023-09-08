import { IPosition } from "@/type/data/IPosition"
import { createSlice } from "@reduxjs/toolkit"

export const currentSlice = createSlice({
  name: "current",
  initialState: {
    planetId: undefined,
    fleetId: undefined,
    asteroidId: undefined,
    pirateId: undefined,
    sendPosition: undefined,
    user: {
      id: "1",
    },
  },
  reducers: {
    setCurrentPlanet: (state, { payload: planetId }: { payload: string | undefined }) => {
      // @ts-ignore
      state.planetId = planetId
    },
    setCurrentFleet: (state, { payload: fleetId }: { payload: string | undefined }) => {
      // @ts-ignore
      state.fleetId = fleetId
    },
    setCurrentAsteroid: (
      state,
      { payload: asteroidId }: { payload: string | undefined },
    ) => {
      // @ts-ignore
      state.asteroidId = asteroidId
    },
    setCurrentPirate: (state, { payload: pirateId }: { payload: string | undefined }) => {
      // @ts-ignore
      state.pirateId = pirateId
    },
    setCurrentSendPosition: (
      state,
      { payload: sendPosition }: { payload: IPosition | undefined },
    ) => {
      // @ts-ignore
      state.sendPosition = sendPosition
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCurrentPlanet,
  setCurrentFleet,
  setCurrentAsteroid,
  setCurrentPirate,
  setCurrentSendPosition,
} = currentSlice.actions

export default currentSlice.reducer
