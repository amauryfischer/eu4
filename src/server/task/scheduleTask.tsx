import nodeSchedule from "node-schedule"
import db from "@/app/db"
import moment from "moment"
import { ITask } from "@/type/data/ITask"
import allTasks from "./allTasks"
// Function to schedule a job
async function scheduleTask(task: ITask) {
	const endDate = await allTasks[task.type].onCreate(task)
	const newJob = await db.task.create({
		data: {
			...task,
			details: task.details,
			endDate: endDate.toISOString()
		}
	})

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

	return newJob
}

async function acceleratePendingTask(taskId: ITask["id"], seconds: number) {
	// 1) fetch task from db
	// 2) check if task is finished with accelerated seconds
	// 3) if task is not finished, update the endDate and the job
	// 4) if task is finished, execute the job
	const taskDb = await db.task.findUnique({
		where: { id: taskId }
	})
	if (!taskDb) {
		throw new Error("Task not found")
	}
	const endDate = moment(taskDb.endDate).subtract(seconds, "seconds")
	await db.task.update({
		where: { id: taskId },
		data: { endDate: endDate.toISOString() }
	})
	if (moment(taskDb.endDate).isBefore(moment())) {
		await allTasks[taskDb.type].onDestroy(taskDb)
		await db.task.delete({
			where: { id: taskId }
		})
	}
	// cancel the job
	nodeSchedule.cancelJob(taskId)

	const job = nodeSchedule.scheduleJob(
		taskId,
		new Date(endDate.toISOString()),
		async () => {
			console.log(`Executing job ${taskId}`)
			await allTasks[taskDb.type].onDestroy(taskDb as any)
			await db.task.delete({
				where: { id: taskId }
			})
		}
	)
	return job
}

export default scheduleTask
