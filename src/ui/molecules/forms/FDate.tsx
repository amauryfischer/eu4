import { Input } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FDateProps {
	label: string
	placeholder: string
	name: string
}

const FDate = ({ label, placeholder, name }: FDateProps) => {
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

	// nextui
	return (
		<Input
			label={label}
			placeholder={placeholder}
			width="100%"
			type="date"
			{...field}
			errorMessage={error?.message}
		/>
	)
}

export default FDate
