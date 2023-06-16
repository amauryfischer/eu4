"use client"

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
import { useEffect, useMemo, useState, useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { styled } from "styled-components"

const ChargesFixesContainer = styled.div`
	${changePrimary("caramel")}
`

interface ChargeFixesPageProps {
	charges: Charge[]
}
const ChargesFixesPage = ({ charges }: ChargeFixesPageProps) => {
	const [modifyCharge, setModifyCharge] = useState<Charge | null>(null)
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: false,
	})
	const { createCharge, deleteCharge, updateCharge } = useChargesActions()

	const methods = useForm<Charge>()

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

	const columns = useMemo(
		() =>
			[
				{
					header: "Nom",
					accessorKey: "nom",
				},
				{
					header: "Montant",
					accessorKey: "montant",
				},
			] as ColumnDef<Charge>[],
		[],
	)

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
					data={charges}
					columns={columns}
					onEditClick={handleEditClick}
					onDeleteClick={handleDeleteClick}
				/>

				<FormProvider {...methods}>
					<Modal isOpen={isOpen} onClose={onOpenChange}>
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
			</div>
		</ChargesFixesContainer>
	)
}

export default ChargesFixesPage
