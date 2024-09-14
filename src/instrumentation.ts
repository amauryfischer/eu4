import axios from "axios"

let isRegistered = false

export function register() {
	if (isRegistered) return
	isRegistered = true

	console.log("registering instrumentation")
	axios
		.post("http://localhost:3000/api/restore-jobs")
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.error("Error restoring jobs:", error)
		})
}