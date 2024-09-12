import { ITaskResearch } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
const taskResearch = {
	onCreate: async (task: ITaskResearch) => {
		return moment(task.endDate).toDate()
	},
	onDestroy: async (task: ITaskResearch) => {
		await db.user.update({
			where: {
				id: task.userId
			},
			data: {
				research: {
					push: task.details.research
				}
			}
		})
	}
}

export default taskResearch
