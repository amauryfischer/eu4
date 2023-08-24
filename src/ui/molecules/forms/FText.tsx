import { Input } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FTextProps {
	label?: string
	placeholder?: string
	name: string
	autoFocus?: boolean
	size?: "sm" | "md" | "lg"
}

const FText = ({
	label = undefined,
	placeholder,
	name,
	autoFocus = false,
	size = undefined,
}: FTextProps) => {
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
			size={size}
			autoFocus={autoFocus}
			label={label}
			placeholder={placeholder}
			width="100%"
			{...field}
			errorMessage={error?.message}
		/>
	)
}

export default FText
