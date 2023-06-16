import useWhyDidYouUpdate from "@/hooks/utils/use-why-did-you-update.hook"
import DeleteButton from "@/ui/atoms/buttons/DeleteButton/DeleteButton"
import ModifyButton from "@/ui/atoms/buttons/ModifyButton/ModifyButton"
import Edit from "@/ui/fondations/icons/Edit"
import {
	TableCell,
	TableColumn,
	Table,
	TableHeader,
	TableBody,
	TableRow,
} from "@nextui-org/react"
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { data } from "autoprefixer"
import React from "react"
import { useMemo } from "react"
import { styled } from "styled-components"

interface BTableProps<T> {
	data: T[]
	columns: ColumnDef<T>[]
	onEditClick?: (data: T) => void
	onDeleteClick?: (data: T) => void
}
const STableColumn = styled(TableColumn)<{ width: number }>`

	${({ width }) => `
		width: ${width}px !important;
		min-width: ${width}px !important;
		max-width: ${width}px !important;
	`}
`
const BTable = <T extends object>({
	data,
	columns,
	onEditClick,
	onDeleteClick,
}: BTableProps<T>) => {
	const augmentedColumns = useMemo(() => {
		const newColumns = [...columns]
		if (onEditClick || onDeleteClick) {
			newColumns.push({
				id: "actions",
				header: "Actions",
				size: 80,
				maxSize: 80,
				minSize: 80,
				cell: ({ row }) => (
					<div className="flex gap-4">
						{onEditClick && (
							<ModifyButton
								handleClick={() => {
									onEditClick(row.original)
								}}
							/>
						)}
						{onDeleteClick && (
							<DeleteButton
								handleClick={() => {
									onDeleteClick(row.original)
								}}
							/>
						)}
					</div>

				),
			} as ColumnDef<T>)
		}
		return newColumns
	}, [columns, onEditClick, onDeleteClick])

	const table = useReactTable({
		data,
		columns: augmentedColumns,
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: "onChange",
		enableColumnResizing: true,
	})
	useWhyDidYouUpdate("BTable", { data, columns, onEditClick, onDeleteClick } )
	return (
		<>
			<div className="p-2">
				<Table>
					{
						table.getHeaderGroups().map((headerGroup) => (
							<TableHeader key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableColumn key={header.id} width={header.getSize()}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableColumn>
									)
								})}
							</TableHeader>
						)) as any
					}
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
					{/* <tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.footer,
													header.getContext(),
											  )}
									</th>
								))}
							</tr>
						))}
					</tfoot> */}
				</Table>
			</div>
		</>
	)
}

export default BTable
