"use client"

import useChargesActions from "@/hooks/data/use-charges-actions.hook"
import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import BaseButton from "@/ui/atoms/buttons/BaseButton/BaseButton"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"
import FDate from "@/ui/molecules/FDate"
import FNumber from "@/ui/molecules/FNumber"
import FSelect from "@/ui/molecules/FSelect"
import FText from "@/ui/molecules/FText"
import changePrimary from "@/utils/changePrimary"
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from "@nextui-org/react"
import { Charge } from "@prisma/client"
import Moment from "moment"
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
				// @ts-ignore
				dateDebut: new Moment().format("DD/MM/YYYY"),
				// @ts-ignore
				dateFin: new Moment().format("DD/MM/YYYY"),
				scenario: "",
			})
		}
	}, [modifyCharge])

	return (
		<ChargesVariablesContainer>
			<div className="container flex justify-between w-full mx-auto">
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

			<Table aria-label="Example table with static content">
				<TableHeader>
					<TableColumn>Nom</TableColumn>
					<TableColumn>Montant</TableColumn>
					<TableColumn>Fréquence</TableColumn>
					<TableColumn>Date de début</TableColumn>
					<TableColumn>Date de fin</TableColumn>
					<TableColumn>Scenario</TableColumn>
					<TableColumn className="w-16">Action</TableColumn>
				</TableHeader>
				<TableBody>
					{charges.map((charge) => (
						<TableRow key={charge.id}>
							<TableCell>{charge.nom}</TableCell>
							<TableCell>
								{charge.montant > 0 && (
									<div className="text-emerald-600 font-bold leading-8">
										+{charge.montant}
									</div>
								)}
								{charge.montant < 0 && (
									<div className="text-red-600 font-bold leading-8">
										{charge.montant}
									</div>
								)}
							</TableCell>
							<TableCell>{charge.frequency}</TableCell>
							<TableCell>{charge.dateDebut}</TableCell>
							<TableCell>{charge.dateFin}</TableCell>
							<TableCell>{charge.scenario}</TableCell>
							<TableCell>
								<div className="flex flex-row gap-2">
									<Button
										color="default"
										variant="light"
										onPress={() => {
											setModifyCharge(charge)
											onOpenChange()
										}}
									>
										Modifier
									</Button>
									<Button
										color="danger"
										onPress={() => {
											deleteCharge(charge.id)
										}}
									>
										Supprimer
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
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
