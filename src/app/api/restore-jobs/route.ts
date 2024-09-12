import { NextResponse } from "next/server"
import restoreAllJobsfromDB from "@/server/task/restoreAllJobsfromDB"

export async function POST() {
	try {
		await restoreAllJobsfromDB()
		return NextResponse.json(
			{ message: "Jobs restored successfully" },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: "Failed to restore jobs" },
			{ status: 500 }
		)
	}
}

export function OPTIONS() {
	return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } })
}