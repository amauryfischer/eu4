import CancelIconButton from "@/ui/atoms/iconButtons/CancelIconButton/CancelIconButton"
import SaveIconButton from "@/ui/atoms/iconButtons/SaveIconButton/SaveIconButton"
import { CellContext } from "@tanstack/react-table"
import { startTransition, useCallback, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { styled, css } from "styled-components"

const StyledCell = styled.div<{ isEditing: boolean }>`
	&:hover {
		cursor: pointer;
		${({ isEditing }) =>
			!isEditing &&
			css`
		background-color: hsl(
			var(--primary-hue),
			var(--primary-saturation),
			98%
			);
			`};
		}
		min-height: 50px;
`

const EditableCell = <T extends { id: string }>({
	getValue,
	row,
	column,
	renderCellValue,
	children,
	updateAction,
}: CellContext<T, unknown> & {
	renderCellValue: JSX.Element
	children: JSX.Element
	updateAction: (id: string, data: T) => void
}) => {
	const value = getValue() as string
	const [isEditing, setIsEditing] = useState(false)
	const methods = useForm<T>()
	const { reset } = methods
	const { id } = row.original

	const accessorKey = column.id as keyof T
	const onEditClick = useCallback(() => {
		setIsEditing(true)
	}, [])
	const onCancelClick = useCallback(() => {
		setIsEditing(false)
	}, [])
	const onSaveClick = useCallback(() => {
		startTransition(() => {
			setIsEditing(false)
			updateAction(id, {
				// @ts-ignore
				[accessorKey]: methods.getValues(accessorKey),
				...methods.getValues(),
			})
		})
	}, [])
	useEffect(() => {
		if (isEditing) {
			// @ts-ignore
			reset({
				[accessorKey]: value,
			})
		}
	}, [isEditing])
	return (
		<StyledCell
			isEditing={isEditing}
			onClick={onEditClick}
			className="px-2 py-2 hover:shadow-2xl w-full h-full"
		>
			{isEditing ? (
				<div className="flex justify-center gap-4 w-full">
					<div className="grow w-full">
						<FormProvider {...methods}>{children}</FormProvider>
					</div>
					<CancelIconButton handleClick={onCancelClick} />
					<SaveIconButton handleClick={onSaveClick} />
				</div>
			) : (
				<div>{renderCellValue}</div>
			)}
		</StyledCell>
	)
}

export default EditableCell
