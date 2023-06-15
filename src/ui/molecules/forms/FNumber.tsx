import { Input } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FNumberProps {
	label: string
	placeholder: string
	name: string
}

const FNumber = ({ label, placeholder, name }: FNumberProps) => {
	const { control } = useFormContext()
	const {
		field,
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields },
	} = useController({
		name,
		control,
	})

	// nextui
	return (
		<Input
			label={label}
			placeholder={placeholder}
			width="100%"
			type="number"
			step="1"
			{...field}
			onChange={(event) => field.onChange(+event.target.value)}
			errorMessage={error?.message}
		/>
	)
}

export default FNumber
