import Schema from "@/type/Schema"
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react"
import { BModalTitle } from "../BModal.styled"
import getEditableContentFromSchemaPropertie from "@/utils/schema/getEditableContentFromSchemaPropertie"
import { FormProvider, useForm } from "react-hook-form"
import buildYupFromSchema from "@/utils/schema/buildYupFromSchema"
import { useEffect } from "react"
import _ from "lodash"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"

interface ModalSchemaProps<T> {
	initialData?: T | null
	schema: Schema
	isOpen: boolean
	onOpenChange: () => void
	update: (id: string, data: T) => void
	create: (data: T) => void
}

const ModalSchema = <T extends { id?: string }>({
	initialData,
	schema,
	isOpen,
	onOpenChange,
	update,
	create,
}: ModalSchemaProps<T>) => {
	const isEditing = initialData?.id ? true : false

	const yupSchema = buildYupFromSchema(schema) as any
	const methods = useForm<T>({
		defaultValues: yupSchema.getDefault(),
	})

	useEffect(() => {
		if (!_.isEmpty(initialData)) {
			methods.reset(initialData)
		} else {
			methods.reset(yupSchema.getDefault())
		}
	}, [initialData])

	// @return
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<FormProvider {...methods}>
				<ModalContent>
					<ModalHeader>
						<BModalTitle>
							{isEditing ? "Modifier" : "Ajouter"} {schema.name}
						</BModalTitle>
					</ModalHeader>
					<ModalBody>
						{Object.values(schema.properties).map((property) => (
							<>
								{getEditableContentFromSchemaPropertie({
									schemaPropertie: property,
								})}
							</>
						))}
					</ModalBody>
					<ModalFooter>
						<CancelButton handleClick={() => onOpenChange()} />

						<SaveButton
							handleClick={() => {
								methods.handleSubmit((data) => {
									if (initialData?.id) {
										update(initialData.id, data)
									} else {
										create(data)
									}
								})()
								return onOpenChange()
							}}
						/>
					</ModalFooter>
				</ModalContent>
			</FormProvider>
		</Modal>
	)
}

export default ModalSchema
