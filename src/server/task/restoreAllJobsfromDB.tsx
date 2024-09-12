import db from "@/app/db"
import nodeSchedule from "node-schedule"
import { ITask } from "@/type/data/ITask"
import moment from "moment"
import allTasks from "./allTasks"

async function restoreAllJobsfromDB() {
	// Query for jobs that are still pending
	const dbTasks = (await db.task.findMany()) as ITask[]

	// all tasks which should have been ended
	const endedTasks = dbTasks.filter((task) =>
		moment(task.endDate).isBefore(moment())
	)

	console.log(`🏁 Restoring ${endedTasks.length} ending tasks`)
	await Promise.all(
		endedTasks.map((task) => allTasks[task.type].onDestroy(task as ITask))
	)

	const pendingTasks = dbTasks.filter(
		(task) => !endedTasks.map((t) => t.id).includes(task.id)
	)

	console.log(`🔄 Rescheduling ${pendingTasks.length} tasks`)

	// Reschedule each job
	pendingTasks.forEach((task: ITask) => {
		const scheduleTime = moment(task.endDate)
		nodeSchedule.scheduleJob(task.id, scheduleTime.toDate(), async () => {
			// Perform your job logic here
			await allTasks[task.type].onDestroy(task as ITask)
			await db.task.delete({
				where: { id: task.id }
			})
		})
	})
}

export default restoreAllJobsfromDB
