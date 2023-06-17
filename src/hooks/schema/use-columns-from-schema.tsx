import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"
import EditableCell from "@/ui/molecules/BTable/EditableCell/EditableCell"
import getEditableContentFromSchemaPropertie from "@/utils/schema/getEditableContentFromSchemaPropertie"
import getRenderedValueFromSchemaPropertie from "@/utils/schema/getRenderedValueFromSchemaProperty"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

const useColumnsFromSchema = <T extends { id: string }>({
	schema,
	editable = false,
	updateAction,
}: {
	schema: Schema
	editable: boolean
	updateAction: (id: string, data: T) => void
}) => {
	const columns = useMemo(() => {
		const newColumns = [] as ColumnDef<T>[]
		for (const key in schema) {
			switch (schema[key].type) {
				case SchemaTypes.UUID:
					break
				default:
					newColumns.push({
						header: schema[key].label,
						accessorKey: schema[key].name,
						...(editable && {
							cell: (props: CellContext<T, unknown>) => (
								<EditableCell
									renderCellValue={getRenderedValueFromSchemaPropertie({
										schemaPropertie: schema[key],
										value: props.getValue(),
									})}
									updateAction={updateAction}
									{...props}
								>
									{getEditableContentFromSchemaPropertie({
										schemaPropertie: schema[key],
										...props,
									})}
								</EditableCell>
							),
						}),
					})
			}
		}
		return newColumns
	}, [schema, editable])
	return columns
}

export default useColumnsFromSchema
