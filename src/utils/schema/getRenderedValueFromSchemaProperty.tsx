import SchemaTypes from "@/type/SchemaTypes"
import stringToColour from "../stringToColour"

const getRenderedValueFromSchemaPropertie = ({
	schemaPropertie,
	value,
}: {
	schemaPropertie: {
		type: SchemaTypes
		options?: {
			value: string
			label: string
			alias?: string[]
		}[]
		isMulti?: boolean
	}
	value: any
}) => {
	switch (schemaPropertie.type) {
		case SchemaTypes.SELECT:
			if (schemaPropertie.isMulti) {
				const values = value as string[]
				return (
					<div className="flex flex-col">
						{values?.map((value) => (
							<span
								className="bg-gray-200 rounded-full px-2 py-1 text-xs font-bold mr-1 mb-1"
								style={{
									border: `1px solid ${stringToColour(value)}`,
									color: stringToColour(value),
								}}
							>
								{value}
							</span>
						))}
					</div>
				)
			} else {
				if (!value) return null
				return (
					<span
						className="bg-gray-200 rounded-full px-2 py-1 text-xs font-bold mr-1 mb-1"
						style={{
							border: `1px solid ${stringToColour(value)}`,
							color: stringToColour(value),
						}}
					>
						{value}
					</span>
				)
			}
		default:
			return value
	}
}

export default getRenderedValueFromSchemaPropertie
