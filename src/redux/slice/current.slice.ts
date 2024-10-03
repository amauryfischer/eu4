import type { IPosition } from "@/type/data/IPosition"
import { createSlice } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import { BUILDING_TYPE } from "@/type/data/IPlanet"
import { ITaskFight } from "@/type/data/ITask"

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
		user: undefined,
		upgradeBuilding: undefined,
		currentCombatTask: undefined
	},
	reducers: {
		setCurrentUpgradeBuilding: (
			state,
			{ payload: buildingType }: { payload: BUILDING_TYPE | undefined }
		) => {
			state.upgradeBuilding = buildingType
		},
		setCurrentCombatTask: (
			state,
			{ payload: combatTask }: { payload: ITaskFight | undefined }
		) => {
			state.currentCombatTask = combatTask
		},
		setCurrentPlanet: (
			state,
			{ payload: planetId }: { payload: string | undefined }
		) => {
			// @ts-ignore
			state.planetId = planetId
		},
		setCurrentFleet: (
			state,
			{ payload: fleetId }: { payload: string | undefined }
		) => {
			// @ts-ignore
			state.fleetId = fleetId
		},
		setCurrentAsteroid: (
			state,
			{ payload: asteroidId }: { payload: string | undefined }
		) => {
			// @ts-ignore
			state.asteroidId = asteroidId
		},
		setCurrentPirate: (
			state,
			{ payload: pirateId }: { payload: string | undefined }
		) => {
			// @ts-ignore
			state.pirateId = pirateId
		},
		setCurrentShip: (
			state,
			{ payload: shipId }: { payload: string | undefined }
		) => {
			// @ts-ignore
			state.shipId = shipId
		},
		setCurrentSendPosition: (
			state,
			{ payload: sendPosition }: { payload: IPosition | undefined }
		) => {
			// @ts-ignore
			state.sendPosition = sendPosition
		},
		setCurrentPlayerActivePlanetId: (
			state,
			{ payload: playerActivePlanetId }: { payload: string | undefined }
		) => {
			// @ts-ignore
			state.playerActivePlanetId = playerActivePlanetId
		},
		setCurrentUser: (
			state,
			{ payload: user }: { payload: IUser | undefined }
		) => {
			// @ts-ignore
			state.user = user
		}
	}
})

// Action creators are generated for each case reducer function
export const {
	setCurrentPlanet,
	setCurrentFleet,
	setCurrentAsteroid,
	setCurrentPirate,
	setCurrentSendPosition,
	setCurrentShip,
	setCurrentPlayerActivePlanetId,
	setCurrentUser,
	setCurrentUpgradeBuilding,
	setCurrentCombatTask
} = currentSlice.actions

export default currentSlice.reducer
