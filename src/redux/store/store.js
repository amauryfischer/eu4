import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../slice/data.slice';
import currentReducer from '../slice/current.slice';
const store = configureStore({
  reducer: {
    data: dataReducer,
    current: currentReducer,
  },
});

export default store;
