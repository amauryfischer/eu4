import { Prisma } from "@prisma/client"
import { useDispatch } from "react-redux"
import { startTransition } from "react"
import { fetchParcelsData } from "@/server/dataServer"
import { addData, removeDataConditional } from "@/redux/slice/data.slice"
import { IPosition } from "@/type/data/IPosition"
import _ from "lodash"
import { IPlanet } from "@/type/data/IPlanet"
import { IFleet } from "@/type/data/IFleet"
import IAsteroid from "@/type/data/IAsteroid"
import IPirate from "@/type/data/IPirate"
const useParcelsActions = () => {
	const dispatch = useDispatch()

	const fetchDataAction = async (system: IPosition["system"]) => {
		let fetchedData: {
			planets: IPlanet[]
			fleets: IFleet[]
			asteroids: IAsteroid[]
			pirates: IPirate[]
		}
		startTransition(() => {
			const fetchServer = async () => {
				const { planets, fleets, asteroids, pirates, ships } =
					await fetchParcelsData(system)
				// remove all data on same system
				dispatch(
					removeDataConditional({
						type: "Planet",
						condition: (data) => _.isEqual(data.position.system, system)
					})
				)
				dispatch(
					removeDataConditional({
						type: "Fleet",
						condition: (data) => _.isEqual(data.position.system, system)
					})
				)
				dispatch(
					removeDataConditional({
						type: "Asteroid",
						condition: (data) => _.isEqual(data.position.system, system)
					})
				)
				dispatch(
					removeDataConditional({
						type: "Pirate",
						condition: (data) => _.isEqual(data.position.system, system)
					})
				)
				
				planets.forEach((planet) => {
					dispatch(addData({ type: "Planet", dataId: planet.id, data: planet }))
				})
				fleets.forEach((fleet) => {
					dispatch(addData({ type: "Fleet", dataId: fleet.id, data: fleet }))
				})
				asteroids.forEach((asteroid) => {
					dispatch(
						addData({ type: "Asteroid", dataId: asteroid.id, data: asteroid })
					)
				})
				pirates.forEach((pirate) => {
					dispatch(addData({ type: "Pirate", dataId: pirate.id, data: pirate }))
				})
				ships.forEach((ship) => {
					dispatch(addData({ type: "Ship", dataId: ship.id, data: ship }))
				})
			}
			fetchServer()
		})
		return fetchedData
	}

	return fetchDataAction
}

export default useParcelsActions
