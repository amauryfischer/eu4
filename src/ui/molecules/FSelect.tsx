import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
} from "@nextui-org/react"
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
	})
	return (
		<Dropdown>
			<DropdownTrigger>
				<div className="flex flex-col gap-2">
					<label htmlFor={name}>{label}</label>
					<Input
						id={name}
						placeholder={placeholder}
						{...field}
						value={field.value}
					/>
				</div>
			</DropdownTrigger>
			<DropdownMenu
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
					<DropdownItem className="h-12 w-96 min-w-full" key={option.value}>
						{option.label}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	)
}

export default FSelect
