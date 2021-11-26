import { createAsyncThunk } from "@reduxjs/toolkit"
import ShipApi from "./ShipApi"
import { setShips } from "./shipReducer"

export const createShip = createAsyncThunk(
  "data/ship/createShip",
  async ({ ship }: any, { dispatch, getState }) => {
    try {
      await ShipApi.createShip(ship)
      getShips(dispatch)
    } catch (error) {
      console.error(error)
    }
  },
)

export const getShips = (dispatch) => {
  const ships = ShipApi.getShips()
  dispatch(setShips({ ships }))
}
