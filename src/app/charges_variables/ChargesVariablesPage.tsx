"use client"

import { useCallback, useMemo } from "react"
import useChargesActions from "@/hooks/data/actions/use-charges-actions.hook"
import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"
import BTable from "@/ui/organisms/Btable/BTable"
import FNumber from "@/ui/molecules/forms/FNumber"
import FSelect from "@/ui/molecules/forms/FSelect"
import FText from "@/ui/molecules/forms/FText"
import changePrimary from "@/utils/changePrimary"
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react"
import { Charge } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Moment from "moment"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { styled } from "styled-components"
import useColumnsFromSchema from "@/hooks/schema/use-columns-from-schema"
import chargeSchema from "@/schema/charge.schema"
import useCharges from "@/hooks/data/entity/use-charges.hook"
import ModalSchema from "@/ui/organisms/BModal/ModalSchema/ModalSchema"

const ChargesVariablesContainer = styled.div`
	${changePrimary("purple")}
`

const ChargesVariablesPage = () => {
	const [modifyCharge, setModifyCharge] = useState<Charge | null>(null)
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: false,
	})
	const charges = useCharges()
	const { createCharge, deleteCharge, updateCharge, fetchCharge } =
		useChargesActions()

	useEffect(() => {
		fetchCharge()
	}, [])

	const methods = useForm<Charge>()

	const handleEdit = useCallback((charge: Charge) => {
		setModifyCharge(charge)
		onOpenChange()
	}, [])

	const handleDelete = useCallback((charge: Charge) => {
		deleteCharge(charge.id)
	}, [])

	useEffect(() => {
		if (modifyCharge) {
			methods.reset(modifyCharge)
		} else {
			methods.reset({
				nom: "",
				montant: 0,
				dateDebut: Moment().format("DD/MM/YYYY"),
				dateFin: Moment().format("DD/MM/YYYY"),
				scenario: "",
			})
		}
	}, [modifyCharge])

	const columns = useColumnsFromSchema<Charge>({
		schema: chargeSchema,
		editable: true,
		updateAction: updateCharge,
	})

	return (
		<ChargesVariablesContainer className="container mx-auto">
			<div className="container flex justify-between w-full mx-auto py-12">
				<h1 className="text-4xl font-bold text-center text-gray-900">
					Charges variables
				</h1>
				<AddButton
					handleClick={() => {
						setModifyCharge(null)
						onOpenChange()
					}}
					label="Ajouter une charge variable"
				/>
			</div>

			<BTable
				columns={columns}
				data={
					Object.values(charges || {}).filter(
						(charge) => charge.type === "Variable",
					) as Charge[]
				}
				onEditClick={handleEdit}
				onDeleteClick={handleDelete}
			/>

			<ModalSchema
				schema={chargeSchema}
				initialData={modifyCharge}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				update={updateCharge}
				create={createCharge}
			/>
		</ChargesVariablesContainer>
	)
}

export default ChargesVariablesPage
