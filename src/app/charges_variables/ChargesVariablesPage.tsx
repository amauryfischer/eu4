"use client"

import useChargesActions from "@/hooks/data/use-charges-actions.hook"
import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import BaseButton from "@/ui/atoms/buttons/BaseButton/BaseButton"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"
import FNumber from "@/ui/molecules/FNumber"
import FSelect from "@/ui/molecules/FSelect"
import FText from "@/ui/molecules/FText"
import changePrimary from "@/utils/changePrimary"
import { Button, Modal, Table, useModal } from "@nextui-org/react"
import { Charge } from "@prisma/client"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { styled } from "styled-components"

const ChargesVariablesContainer = styled.div`
	${changePrimary("purple")}
`

interface ChargeVariablesPageProps {
	charges: Charge[]
}
const ChargesVariablesPage = ({ charges }: ChargeVariablesPageProps) => {
	const [modifyCharge, setModifyCharge] = useState<Charge | null>(null)
	const { setVisible, bindings } = useModal()
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

	return (
		<ChargesVariablesContainer>
			<div className="container flex justify-between w-full mx-auto flex-col gap-4 my-16">
				<div className="container flex justify-between w-full mx-auto">
					<h1 className="text-4xl font-bold text-center text-gray-900">
						Charges variables
					</h1>
					<AddButton
						handleClick={() => {
							setModifyCharge(null)
							setVisible(true)
						}}
						label="Ajouter une charge variable"
					/>
				</div>
			</div>
			<Table
				aria-label="Example table with static content"
				css={{
					height: "auto",
					minWidth: "100%",
				}}
			>
				<Table.Header>
					<Table.Column>Nom</Table.Column>
					<Table.Column>Montant</Table.Column>
					<Table.Column>Action</Table.Column>
				</Table.Header>
				<Table.Body>
					{charges.map((charge) => (
						<Table.Row key={charge.id}>
							<Table.Cell>{charge.nom}</Table.Cell>
							<Table.Cell>{charge.montant}</Table.Cell>
							<Table.Cell>
								<div className="flex flex-row gap-2">
									<BaseButton
										color="primary"
										auto
										ghost
										onClick={() => {
											setModifyCharge(charge)
											setVisible(true)
										}}
									>
										Modifier
									</BaseButton>
									<Button
										color="error"
										auto
										ghost
										onClick={() => {
											deleteCharge(charge.id)
										}}
									>
										Supprimer
									</Button>
								</div>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<FormProvider {...methods}>
				<Modal {...bindings}>
					<Modal.Header>{modifyCharge ? "Edit" : "Add"} Charge</Modal.Header>
					<Modal.Body>
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
					</Modal.Body>
					<Modal.Footer>
						<CancelButton handleClick={() => setVisible(false)} />

						<SaveButton
							handleClick={() => {
								methods.handleSubmit((data) => {
									if (modifyCharge) {
										updateCharge(modifyCharge.id, data)
									} else {
										createCharge(data)
									}
								})()
								return setVisible(false)
							}}
						/>
					</Modal.Footer>
				</Modal>
			</FormProvider>
		</ChargesVariablesContainer>
	)
}

export default ChargesVariablesPage
