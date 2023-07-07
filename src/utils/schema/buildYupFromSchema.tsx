import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"
import * as yup from "yup"
type YupSchemaType =
	| yup.StringSchema
	| yup.NumberSchema
	| yup.DateSchema
	| yup.BooleanSchema

const buildYupFromSchema = (schema: Schema) => {
	const yupSchema = {} as Record<string, YupSchemaType>

	for (const key in schema.properties) {
		const element = schema.properties[key]

		switch (element.type) {
			case SchemaTypes.UUID:
				yupSchema[key] = yup.string().uuid().default(undefined)
				break
			case SchemaTypes.STRING:
				yupSchema[key] = yup.string().default(undefined)
				break
			case SchemaTypes.NUMBER:
				yupSchema[key] = yup.number().default(undefined)
				break
			case SchemaTypes.DATE:
				yupSchema[key] = yup.date().default(undefined)
				break
			case SchemaTypes.BOOLEAN:
				yupSchema[key] = yup.boolean().default(undefined)
				break
			case SchemaTypes.SELECT:
				// @ts-ignore
				yupSchema[key] = element.isMulti
					? yup.array().of(yup.string()).default(undefined)
					: yup.string()
				break
			case SchemaTypes.RADIO:
				yupSchema[key] = yup.string().default(undefined)
				break
			case SchemaTypes.CHECKBOX:
				// @ts-ignore
				yupSchema[key] = yup.array().of(yup.string()).default(undefined)
				break
			default:
				break
		}
	}

	return yup.object().shape(yupSchema)
}

export default buildYupFromSchema
