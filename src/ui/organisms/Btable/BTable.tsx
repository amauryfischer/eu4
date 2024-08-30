import useWhyDidYouUpdate from "@/hooks/utils/use-why-did-you-update.hook"
import DeleteIconButton from "@/ui/atoms/iconButtons/DeleteIconButton/DeleteIconButton"
import ModifyIconButton from "@/ui/atoms/iconButtons/ModifyIconButton/ModifyIconButton"
import Defer from "@/utils/Defer"
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react"
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"
import { styled } from "styled-components"

interface BTableProps<T> {
	data: T[]
	columns: ColumnDef<T>[]
	onEditClick?: (data: T) => void
	onDeleteClick?: (data: T) => void
}

const STable = styled(Table)<{ widthActions?: number }>`
	& [data-key="actions"] {
		${({ widthActions }) => `
			width: ${widthActions}px !important;
		`}
	}
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
				cell: ({ row }) => (
					<div className="flex gap-4">
						{onEditClick && (
							<ModifyIconButton
								handleClick={() => {
									onEditClick(row.original)
								}}
							/>
						)}
						{onDeleteClick && (
							<DeleteIconButton
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
	return (
		<>
			<div className="p-2">
				<STable
					widthActions={80}
					shadow="none"
					classNames={{
						td: ["pt-1", "px-0"],
					}}
				>
					{
						table.getHeaderGroups().map((headerGroup) => (
							<TableHeader key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableColumn key={header.id}>
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
						{table?.getRowModel?.()?.rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</STable>
			</div>
		</>
	)
}

export default BTable
