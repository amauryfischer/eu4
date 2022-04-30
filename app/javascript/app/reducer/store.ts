import { configureStore } from "@reduxjs/toolkit"
import currentReducer from "./current/currentReducer"
import fleetReducer from "./fleets/fleetReducer"
import planetReducer from "./planets/planetReducer"
import shipReducer from "./ships/shipReducer"
export default configureStore({
  reducer: {
    planets: planetReducer,
    ships: shipReducer,
    fleets: fleetReducer,
    current: currentReducer,
  },
})
