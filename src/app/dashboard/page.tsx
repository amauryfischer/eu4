import { Coda } from "coda-js"
import DashboardPage from "./DashboardPage"
import db from "../db"

const Page = async () => {
	const coda = new Coda("d2d96ef8-15a8-40cb-9853-748bd1faac52") // insert your token
	const doc = await coda.getDoc("kKGwXHFHzd")
	const tableIds = ["grid-htcOFGYgGg"]
	const rowsIds = [
		"c-pIV55WBD9r",
		"c-6oubyCvn3I",
		"c-lRGXBhzBif",
		"c-kQYG1wUE-I",
		"c-H9mLqJhEJQ",
		"c-sry3GFux_O",
		"c-E2nBW7xD3x",
		"c-PcOCQ1OfGq",
		"c-TKws_Ro_1w",
		"c-Ea6e4Ft9y4",
		"c-GCT8R0Fz9E",
		"c-W9XoWK7hNL",
		"c-imnrUbmTVa",
		"c-iSmoAWsQ54",
		"c-_-t_4rw7hr",
		"c-f9HTZLLATs",
	]
	const tables = await Promise.all(
		tableIds.map(async (tableId) => {
			const table = await doc.getTable(tableId)
			const rows = await table.listRows({})
			const data = {
				rows: rows.map((row) => row.values),
				columns: await Promise.all(
					rowsIds.map(async (rowId) => await table.getColumn(rowId)),
				),
			}
			data.rows = data.rows.map((row) => {
				let newRow = {}
				Object.entries(row).map(([key, value]) => {
					// @ts-ignore
					const name = data.columns.find((column) => column.id === key)?.name
					// @ts-ignore
					newRow[name] = value
				})
				return newRow
			})
			return data
		}),
	)
	const clients = tables[0].rows
	const charges = await db.charge.findMany()
	const employees = await db.employee.findMany()
	return (
		<DashboardPage clients={clients} charges={charges} employees={employees} />
	)
}

export default Page
