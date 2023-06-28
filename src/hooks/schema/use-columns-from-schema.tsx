import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"
import EditableCell from "@/ui/organisms/Btable/EditableCell"
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
		for (const key in schema.properties) {
			switch (schema.properties[key].type) {
				case SchemaTypes.UUID:
					break
				default:
					newColumns.push({
						header: schema.properties[key].label,
						accessorKey: schema.properties[key].name,
						...(editable && {
							cell: (props: CellContext<T, unknown>) => (
								<EditableCell
									renderCellValue={getRenderedValueFromSchemaPropertie({
										schemaPropertie: schema.properties[key],
										value: props.getValue(),
									})}
									updateAction={updateAction}
									{...props}
								>
									{getEditableContentFromSchemaPropertie({
										schemaPropertie: schema.properties[key],
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
