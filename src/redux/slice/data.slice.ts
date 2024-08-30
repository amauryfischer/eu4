import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

interface ReducerState {
	entity: {
		[key: string]: { [key: string]: any };
	};
	lastSyncDate: Record<string, String>;
}

export const dynamicSlice = createAppSlice({
	name: "dynamic",
	initialState: {
		entity: {},
		lastSyncDate: {} as Record<string, String>,
	} as ReducerState,
	reducers: {
		setData: (
			state,
			action: PayloadAction<{ type: string; dataId: string; data: any }>,
		) => {
			const { type, data } = action.payload;
			// delete all data
			Object.keys(state?.entity?.[type] ?? {}).forEach((key) => {
				delete state.entity[type][key];
			});
			state.entity[type] = {};
			(data ?? []).forEach((item: any) => {
				state.entity[type] = {
					...state.entity[type],
					[item.id]: item,
				};
			});
			state.lastSyncDate = {
				...state.lastSyncDate,
				[type]: new Date().toISOString(),
			};
		},
		addData: (
			state,
			action: PayloadAction<{ type: string; dataId: string; data: any }>,
		) => {
			const { type, dataId, data } = action.payload;
			state.entity[type] = {
				...state.entity[type],
				[dataId]: data,
			};
		},
		updateData: (
			state,
			action: PayloadAction<{ type: string; dataId: string; data: any }>,
		) => {
			const { type, dataId, data } = action.payload;
			const entity = state.entity?.[type] ?? {};
			state.entity[type] = {
				...entity,
				[dataId]: {
					...(entity?.[dataId] ?? {}),
					...data,
				},
			};
		},
		deleteData: (
			state,
			action: PayloadAction<{ type: string; dataId: string }>,
		) => {
			const { type, dataId } = action.payload;
			delete state.entity[type][dataId];
		},
	},
});

export const { setData, addData, updateData, deleteData } =
	dynamicSlice.actions;

export default dynamicSlice.reducer;
