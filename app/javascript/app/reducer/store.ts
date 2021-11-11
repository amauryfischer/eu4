import { configureStore } from "@reduxjs/toolkit"
import planetReducer from "./planets/planetReducer"
export default configureStore({
  reducer: {
    planets: planetReducer,
  },
})
