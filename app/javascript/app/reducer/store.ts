import { configureStore } from "@reduxjs/toolkit"
import currentReducer from "./current/currentReducer"
import planetReducer from "./planets/planetReducer"
import shipReducer from "./ships/shipReducer"
export default configureStore({
  reducer: {
    planets: planetReducer,
    ships: shipReducer,
    current: currentReducer,
  },
})
