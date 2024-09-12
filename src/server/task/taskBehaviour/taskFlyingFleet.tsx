import { ITaskFlyingFleet } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import { IFleet } from "@/type/data/IFleet"
import IShip from "@/type/data/IShip"
import UniverseService from "@/services/UniverseService"

const taskFlyingFleet = {
	onCreate: async (task: ITaskFlyingFleet) => {
		const fleet = (await db.fleet.findUnique({
			where: { id: task.details.fleetId }
		})) as unknown as IFleet

		const ships = (await db.ship.findMany({
			where: {
				id: {
					in: fleet?.shipIds as string[]
				}
			}
		})) as unknown as Array<IShip>
		const { timeToAdd } = UniverseService.getDistance({
			positionFinal: task.details.position,
			positionInitial: fleet.position,
			ships
		})

		await db.task.update({
			where: {
				id: task.id
			},
			data: {
				endDate: moment().add(timeToAdd, "seconds").format()
			}
		})

		const endDate = moment().add(timeToAdd, "seconds")
		return endDate.toDate()
	},
	onDestroy: async (task: ITaskFlyingFleet) => {
		const fleet = (await db.fleet.findUnique({
			where: { id: task.details.fleetId }
		})) as unknown as IFleet

		await db.fleet.update({
			where: {
				id: fleet?.id
			},
			data: {
				position: task.details.position as any
			}
		})
		// todo : later add check if fleet on same position maybe start a fight
	}
}

export default taskFlyingFleet
