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

export const getShips = async (dispatch) => {
  const ships = await ShipApi.getShips()
  dispatch(setShips({ ships }))
}
