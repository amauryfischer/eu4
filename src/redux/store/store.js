import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../slice/data.slice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
