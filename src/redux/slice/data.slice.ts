import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReducerState {
  data: {
    [key: string]: { [key: string]: any };
  };
  lastSyncDate: Record<string, Date>;
}

export const dynamicSlice = createSlice({
  name: 'dynamic',
  initialState: {
    data: {},
    lastSyncDate: {} as Record<string, Date>,
  } as ReducerState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ type: string; dataId: string; data: any }>
    ) => {
      const { type,  data } = action.payload;
      data.forEach((item: any) => {
        state.data[type] = {
          ...state.data[type],
          [item.id]: item,
        };
      });
      state.lastSyncDate = {
        ...state.lastSyncDate,
        [type]: new Date(),
      };
    },
    addData: (
      state,
      action: PayloadAction<{ type: string; dataId: string; data: any }>
    ) => {
      const { type, dataId, data } = action.payload;
      state.data[type] = {
        ...state.data[type],
        [dataId]: data,
      };
    },
    updateData: (
      state,
      action: PayloadAction<{ type: string; dataId: string; data: any }>
    ) => {
      const { type, dataId, data } = action.payload;
      state.data[type] = {
        ...state.data[type],
        [dataId]: {
          ...state.data[type][dataId],
          ...data,
        },
      };
    },
    deleteData: (
      state,
      action: PayloadAction<{ type: string; dataId: string }>
    ) => {
      const { type, dataId } = action.payload;
      delete state.data[type][dataId];
    },
  },
});

export const {
  setData,
  addData,
  updateData,
  deleteData,
} = dynamicSlice.actions;

export default dynamicSlice.reducer;
