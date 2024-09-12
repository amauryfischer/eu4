import axios from "axios"

export function register() {
	axios
		.post("http://localhost:3000/api/restore-jobs")
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.error("Error restoring jobs:", error)
		})
}