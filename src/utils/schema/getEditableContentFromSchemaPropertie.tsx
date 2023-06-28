import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"
import FNumber from "@/ui/molecules/forms/FNumber"
import FSelect from "@/ui/molecules/forms/FSelect"
import FText from "@/ui/molecules/forms/FText"

const getEditableContentFromSchemaPropertie = ({
	schemaPropertie,
}: {
	schemaPropertie: Schema["properties"][keyof Schema]
}) => {
	switch (schemaPropertie.type) {
		case SchemaTypes.SELECT:
			return (
				<FSelect
					size="xs"
					label={schemaPropertie.label}
					name={schemaPropertie.name}
					placeholder={schemaPropertie.placeholder}
					// @ts-ignore
					options={schemaPropertie.options}
				/>
			)
		case SchemaTypes.NUMBER:
			return (
				<FNumber
					label={schemaPropertie.label}
					size="xs"
					name={schemaPropertie.name}
					placeholder={schemaPropertie.placeholder}
				/>
			)
		case SchemaTypes.DATE:
			return (
				<FText
					label={schemaPropertie.label}
					size="xs"
					name={schemaPropertie.name}
					placeholder={schemaPropertie.placeholder}
				/>
			)
		default:
			return (
				<FText
					size="xs"
					name={schemaPropertie.name}
					label={schemaPropertie.label}
					placeholder={schemaPropertie.placeholder}
				/>
			)
	}
}

export default getEditableContentFromSchemaPropertie
