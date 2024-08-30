import type { IPosition } from "@/type/data/IPosition";
import { createSlice } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

export const currentSlice = createAppSlice({
	name: "current",
	initialState: {
		planetId: undefined,
		fleetId: undefined,
		asteroidId: undefined,
		pirateId: undefined,
		sendPosition: undefined,
		shipId: undefined,
		playerActivePlanetId: undefined,
		user: {
			id: "1",
		},
	},
	reducers: {
		setCurrentPlanet: (
			state,
			{ payload: planetId }: { payload: string | undefined },
		) => {
			// @ts-ignore
			state.planetId = planetId;
		},
		setCurrentFleet: (
			state,
			{ payload: fleetId }: { payload: string | undefined },
		) => {
			// @ts-ignore
			state.fleetId = fleetId;
		},
		setCurrentAsteroid: (
			state,
			{ payload: asteroidId }: { payload: string | undefined },
		) => {
			// @ts-ignore
			state.asteroidId = asteroidId;
		},
		setCurrentPirate: (
			state,
			{ payload: pirateId }: { payload: string | undefined },
		) => {
			// @ts-ignore
			state.pirateId = pirateId;
		},
		setCurrentShip: (
			state,
			{ payload: shipId }: { payload: string | undefined },
		) => {
			// @ts-ignore
			state.shipId = shipId;
		},
		setCurrentSendPosition: (
			state,
			{ payload: sendPosition }: { payload: IPosition | undefined },
		) => {
			// @ts-ignore
			state.sendPosition = sendPosition;
		},
		setCurrentPlayerActivePlanetId: (
			state,
			{ payload: playerActivePlanetId }: { payload: string | undefined },
		) => {
			// @ts-ignore
			state.playerActivePlanetId = playerActivePlanetId;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setCurrentPlanet,
	setCurrentFleet,
	setCurrentAsteroid,
	setCurrentPirate,
	setCurrentSendPosition,
	setCurrentShip,
	setCurrentPlayerActivePlanetId,
} = currentSlice.actions;

export default currentSlice.reducer;
