import { ITaskAssembleFleet } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import FleetService from "@/services/FleetService"

const taskAssembleFleet = {
	onCreate: async (task: ITaskAssembleFleet) => {
		return moment(task.endDate).toDate()
	},
	onDestroy: async (task: ITaskAssembleFleet) => {
		const planet = await db.planet.findUnique({
			where: {
				id: task.details.planetId
			}
		})
		// 50% of planets hydrogen, maxed by fleet capacity
		const ships = await db.ship.findMany({
			where: {
				id: {
					in: task.details.shipIds
				}
			}
		})
		const fleetFuel = FleetService.getTotalFuel({ ships })
		const availableFuel = planet?.resources?.Hydrogène as number
		const takenFuel = Math.min(fleetFuel, availableFuel * 0.5)
		await db.fleet.create({
			data: {
				shipIds: task.details.shipIds,
				position: planet?.position as any,
				name: task.details.name,
				cargo: {},
				fuel: takenFuel
			}
		})
		await db.planet.update({
			where: {
				id: task.details.planetId
			},
			data: {
				resources: {
					...planet?.resources,
					Hydrogène: availableFuel - takenFuel
				}
			}
		})
	}
}

export default taskAssembleFleet
