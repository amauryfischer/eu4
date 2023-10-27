import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "../slice/data.slice"
import currentReducer from "../slice/current.slice"
import { getDefaultMiddleware } from "@reduxjs/toolkit"
const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: false,
})
const store = configureStore({
	reducer: {
		data: dataReducer,
		current: currentReducer,
	},
	middleware: customizedMiddleware,
})

export default store
