import { Prisma } from "@prisma/client"
import { useDispatch } from "react-redux"
import { startTransition } from "react"
import { fetchParcelsData } from "@/server/dataServer"
import { addData } from "@/redux/slice/data.slice"

const useParcelsActions = () => {
	const dispatch = useDispatch()

	const fetchDataAction = async (system: string) => {
		let fetchedData
		startTransition(() => {
			const fetchServer = async () => {
				const { planets, fleets, asteroids, pirates } = await fetchParcelsData(
					system,
				)
				planets.forEach((planet) => {
					dispatch(addData({ type: "Planet", dataId: planet.id, data: planet }))
				})
				fleets.forEach((fleet) => {
					dispatch(addData({ type: "Fleet", dataId: fleet.id, data: fleet }))
				})
				asteroids.forEach((asteroid) => {
					dispatch(
						addData({ type: "Asteroid", dataId: asteroid.id, data: asteroid }),
					)
				})
				pirates.forEach((pirate) => {
					dispatch(addData({ type: "Pirate", dataId: pirate.id, data: pirate }))
				})
			}
			fetchServer()
		})
		return fetchedData
	}

	return fetchDataAction
}

export default useParcelsActions
