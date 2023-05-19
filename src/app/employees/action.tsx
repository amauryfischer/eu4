"use server"

import { Employee } from "@prisma/client"
import db from "../db"
import { revalidatePath } from "next/cache"

export const deleteEmployeeAction = async (id: string) => {
	await db.employee.delete({
		where: {
			id,
		},
	})
	revalidatePath("/employees")
}

export const createEmployeeAction = async (data: Omit<Employee, "id">) => {
	await db.employee.create({
		data,
	})
	revalidatePath("/employees")
}

export const updateEmployeeAction = async (id: string, data: Employee) => {
	await db.employee.update({
		where: {
			id,
		},
		data,
	})
	revalidatePath("/employees")
}
