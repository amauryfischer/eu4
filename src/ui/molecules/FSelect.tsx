import { Dropdown, Input } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FSelectProps {
	label: string
	placeholder: string
	name: string
	options: { label: string; value: string }[]
}

const FSelect = ({ label, placeholder, name, options }: FSelectProps) => {
	const { control } = useFormContext()
	const {
		field,
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields },
	} = useController({
		name,
		control,
		rules: { required: true },
	})
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<div className="flex flex-col gap-2">
					<label htmlFor={name}>{label}</label>
					<Input
						id={name}
						placeholder={placeholder}
						{...field}
						value={field.value}
					/>
				</div>
			</Dropdown.Trigger>
			<Dropdown.Menu
				aria-label="Single selection actions"
				color="secondary"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={field.value}
				onSelectionChange={(e) => {
					// @ts-ignore
					field.onChange(e.currentKey)
				}}
			>
				{options.map((option) => (
					<Dropdown.Item key={option.value}>{option.label}</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default FSelect
