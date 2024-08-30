import SchemaTypes from "./SchemaTypes"

interface Schema {
	name: string
	properties: {
		[key: string]: {
			name: string
			label?: string
			placeholder?: string
			type: SchemaTypes
			options?: {
				value: string
				label: string
				alias?: string[]
			}[]
			isMulti?: boolean
		}
	}
}

export default Schema
