import nodeSchedule from "node-schedule"
import db from "@/app/db"
import moment from "moment"
import { ITask } from "@/type/data/ITask"
import allTasks from "./allTasks"
// Function to schedule a job
async function scheduleTask(task: ITask) {
	const newJob = await db.task.create({
		data: {
			...task,
			details: JSON.stringify(task.details)
		}
	})
	const endDate = await allTasks[task.type].onCreate(task)

	// Schedule the job using node-schedule
	nodeSchedule.scheduleJob(newJob.id, endDate, async () => {
		console.log(`Executing job ${newJob.id}`)

		// Perform your job logic here
		await allTasks[task.type].onDestroy(task)
		// Mark the job as completed in the database
		await db.task.delete({
			where: { id: newJob.id }
		})
	})

	return newJob.id
}

export default scheduleTask
