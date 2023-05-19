import { Employee } from "@prisma/client"
import { useTransition } from "react"
import {
	createEmployeeAction,
	deleteEmployeeAction,
	updateEmployeeAction,
} from "./action"

const useEmployeesActions = () => {
	const [_isPending, startTransition] = useTransition()

	const deleteEmployee = async (id: string) => {
		startTransition(async () => {
			deleteEmployeeAction(id)
		})
	}

	const createEmployee = async (data: Omit<Employee, "id">) => {
		startTransition(async () => {
			createEmployeeAction(data)
		})
	}

	const updateEmployee = async (id: string, data: Employee) => {
		startTransition(async () => {
			updateEmployeeAction(id, data)
		})
	}

	return {
		deleteEmployee,
		createEmployee,
		updateEmployee,
	}
}

export default useEmployeesActions
