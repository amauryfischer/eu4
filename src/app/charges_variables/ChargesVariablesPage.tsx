"use client"

import { useCallback, useMemo } from "react"
import useChargesActions from "@/hooks/data/use-charges-actions.hook"
import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"
import BTable from "@/ui/molecules/BTable/BTable"
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

const ChargesVariablesContainer = styled.div`
	${changePrimary("purple")}
`

interface ChargeVariablesPageProps {
	charges: Charge[]
}
const ChargesVariablesPage = ({ charges }: ChargeVariablesPageProps) => {
	const [modifyCharge, setModifyCharge] = useState<Charge | null>(null)
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: false,
	})
	const { createCharge, deleteCharge, updateCharge } = useChargesActions()

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
				data={charges}
				onEditClick={handleEdit}
				onDeleteClick={handleDelete}
			/>

			<FormProvider {...methods}>
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						<ModalHeader>{modifyCharge ? "Edit" : "Add"} Charge</ModalHeader>
						<ModalBody>
							<FText name="nom" label="Nom" placeholder="Nom de la charge" />
							<FNumber
								name="montant"
								label="Montant"
								placeholder="Montant de la charge"
							/>
							<FSelect
								name="frequency"
								label="Fréquence"
								placeholder="Fréquence de la charge"
								options={[
									{ label: "Mensuel", value: "Mensuel" },
									{ label: "Annuel", value: "Annuel" },
									{ label: "Unique", value: "Unique" },
								]}
							/>
							<FText
								name="dateDebut"
								label="Date de début"
								placeholder="Date de début de la charge"
							/>
							<FText
								name="dateFin"
								label="Date de fin"
								placeholder="Date de fin de la charge"
							/>
							<FSelect
								name="scenario"
								label="Scenario"
								placeholder="Scenario"
								options={[
									{ label: "Scénario 1", value: "Scenario 1" },
									{ label: "Pas de scenario", value: "" },
								]}
							/>
						</ModalBody>
						<ModalFooter>
							<CancelButton handleClick={() => onOpenChange()} />

							<SaveButton
								handleClick={() => {
									methods.handleSubmit((data) => {
										if (modifyCharge) {
											updateCharge(modifyCharge.id, data)
										} else {
											createCharge(data)
										}
									})()
									return onOpenChange()
								}}
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</FormProvider>
		</ChargesVariablesContainer>
	)
}

export default ChargesVariablesPage
