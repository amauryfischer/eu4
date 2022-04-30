import { createAsyncThunk } from "@reduxjs/toolkit"
import IShip from "type/IShip"
import ShipApi from "./ShipApi"
import { setShips } from "./shipReducer"

export const createShip = createAsyncThunk(
  "data/ship/createShip",
  async (ship: IShip, { dispatch, getState }) => {
    try {
      await ShipApi.createShip(ship)
      dispatch(getShips())
    } catch (error) {
      console.error(error)
    }
  },
)

export const getShips = createAsyncThunk(
  "data/ship/getShips",
  async (_props, { dispatch, getState }) => {
    try {
      const ships = await ShipApi.getShips()
      dispatch(setShips({ ships }))
    } catch (error) {
      console.error(error)
    }
  },
)
