"use client"

import useChargesActions from "@/hooks/data/actions/use-charges-actions.hook"
import useColumnsFromSchema from "@/hooks/schema/use-columns-from-schema"
import chargeSchema from "@/schema/charge.schema"
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
import { useEffect, useMemo, useState, useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { styled } from "styled-components"
import useCharges from "@/hooks/data/entity/use-charges.hook"
import ModalSchema from "@/ui/organisms/BModal/ModalSchema/ModalSchema"

const ChargesFixesContainer = styled.div`
	${changePrimary("caramel")}
`

const ChargesFixesPage = () => {
	const [modifyCharge, setModifyCharge] = useState<Charge | null>(null)
	const charges = useCharges()
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: false,
	})
	const { createCharge, deleteCharge, updateCharge, fetchCharge } =
		useChargesActions()

	const methods = useForm<Charge>()
	useEffect(() => {
		fetchCharge()
	}, [])
	useEffect(() => {
		if (modifyCharge) {
			methods.reset(modifyCharge)
		} else {
			methods.reset({
				nom: "",
				montant: 0,
			})
		}
	}, [modifyCharge])

	const handleEditClick = useCallback((charge: Charge) => {
		setModifyCharge(charge)
		onOpenChange()
	}, [])

	const handleDeleteClick = useCallback((charge: Charge) => {
		deleteCharge(charge.id)
	}, [])

	const columns = useColumnsFromSchema<Charge>({
		schema: chargeSchema,
		editable: true,
		updateAction: updateCharge,
	})

	return (
		<ChargesFixesContainer>
			<div className="container flex justify-between w-full mx-auto flex-col gap-4 my-16">
				<div className="container flex justify-between w-full mx-auto">
					<h1 className="text-4xl font-bold text-center text-gray-900">
						Charges fixes
					</h1>
					<AddButton
						handleClick={() => {
							setModifyCharge(null)
							onOpenChange()
						}}
						label="Ajouter une charge fixe"
					/>
				</div>
				<BTable
					data={Object.values(charges || {}).filter(
						(charge) => charge.type === "Fixe",
					)}
					columns={columns}
					onEditClick={handleEditClick}
					onDeleteClick={handleDeleteClick}
				/>
				<ModalSchema
					schema={chargeSchema}
					initialData={modifyCharge}
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					update={updateCharge}
					create={createCharge}
				/>
			</div>
		</ChargesFixesContainer>
	)
}

export default ChargesFixesPage
