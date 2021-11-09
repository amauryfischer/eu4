import { configureStore } from "@reduxjs/toolkit"
import resourcesReducer from "./resources/resourcesReducer"
export default configureStore({
  reducer: {
    resources: resourcesReducer,
  },
})
