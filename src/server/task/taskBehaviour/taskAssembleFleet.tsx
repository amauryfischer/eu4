import { ITaskAssembleFleet } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"

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
		await db.fleet.create({
			data: {
				shipIds: task.details.shipIds,
				position: planet?.position as any,
				name: task.details.name,
				cargo: {},
				fuel: 0
			}
		})
	}
}

export default taskAssembleFleet
