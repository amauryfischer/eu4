"use server"

import db from "@/app/db"

export const fetchServerData = async (type: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	const data = await db[prismaType].findMany()
	return data
}

export const updateServerData = async (type: any, id: any, data: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	const newData = await db[prismaType].update({
		where: {
			id,
		},
		data,
	})
	return newData
}

export const deleteServerData = async (type: any, id: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	await db[prismaType].delete({
		where: {
			id,
		},
	})
}

export const createServerData = async (type: any, data: any) => {
	const prismaType = type.toLowerCase() as any
	// @ts-ignore
	const serverCreatedData = await db[prismaType].create({
		data,
	})

	return serverCreatedData
}
