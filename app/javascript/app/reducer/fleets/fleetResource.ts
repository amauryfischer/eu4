import { IFleet } from "./../../type/IFleet"
import { createAsyncThunk } from "@reduxjs/toolkit"
import FleetApi from "./FleetApi"
import { setFleets } from "./fleetReducer"

export const createFleet = createAsyncThunk(
  "data/fleet/createFleet",
  async (fleet: IFleet, { dispatch, getState }) => {
    try {
      await FleetApi.createFleet(fleet)
      dispatch(getFleets())
    } catch (error) {
      console.error(error)
    }
  },
)

export const getFleets = createAsyncThunk(
  "data/fleet/getFleets",
  async (_props, { dispatch, getState }) => {
    try {
      const fleets = await FleetApi.getFleets()
      dispatch(setFleets({ fleets }))
    } catch (error) {
      console.error(error)
    }
  },
)
