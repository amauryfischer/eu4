export function register() {
	const restoreAllJobsFromDB =
		require("./server/task/restoreAllJobsfromDB").default
	restoreAllJobsFromDB().catch(console.error)
}
