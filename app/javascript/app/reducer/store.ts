import { configureStore } from "@reduxjs/toolkit"
import currentReducer from "./current/currentReducer"
import planetReducer from "./planets/planetReducer"
export default configureStore({
  reducer: {
    planets: planetReducer,
    current: currentReducer,
  },
})
