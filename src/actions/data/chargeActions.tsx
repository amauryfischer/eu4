"use server"

import db from "@/app/db"
import { Charge } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createChargeAction = async (data: Omit<Charge, "id">) => {
	await db.charge.create({
		data,
	})
	revalidatePath("/charges")
}

export const updateChargeAction = async (id: string, data: Charge) => {
	await db.charge.update({
		where: {
			id,
		},
		data,
	})
	revalidatePath("/charges")
}

export const deleteChargeAction = async (id: string) => {
	await db.charge.delete({
		where: {
			id,
		},
	})
	revalidatePath("/charges")
}
