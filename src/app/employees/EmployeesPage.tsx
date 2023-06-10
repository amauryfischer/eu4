"use client"

import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"
import FNumber from "@/ui/molecules/forms/FNumber"
import FSelect from "@/ui/molecules/forms/FSelect"
import FText from "@/ui/molecules/forms/FText"
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
	tv,
	useDisclosure,
} from "@nextui-org/react"
import { Employee } from "@prisma/client"
import moment from "moment"
import { useEffect, useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components"
import useEmployeesActions from "../../hooks/data/use-employees-actions.hook"
import BaseButton from "@/ui/atoms/buttons/BaseButton/BaseButton"

const EmployeeContainer = styled.div`
	${changePrimary("blue")}
`
const styleTableRow = tv({
	base: "bg-neutral-50 hover:drop-shadow-2xl hover:border-blue-500 hover:border-opacity-100 hover:bg-white hover:cursor-pointer rounded px-4",
})
const styleTableCell = tv({
	base: "first:rounded-bl-lg last:rounded-br-lg first:rounded-tl-lg last:rounded-tr-lg",
})

const EmployeesPage = ({ employees }: { employees: Employee[] }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: false,
	})
	const { createEmployee, deleteEmployee, updateEmployee } =
		useEmployeesActions()
	const methods = useForm<Employee>()
	const [modifyEmployee, setModifyEmployee] = useState<Employee | null>(null)
	useEffect(() => {
		if (modifyEmployee) {
			methods.reset(modifyEmployee)
		} else {
			methods.reset({
				nom: "",
				salaire: 0,
				type: "",
				dateDebut: moment().format("DD/MM/YYYY"),
				dateFin: moment().format("DD/MM/YYYY"),
				scenario: "",
			})
		}
	}, [modifyEmployee])

	return (
		<EmployeeContainer>
			<div className="container flex justify-between w-full mx-auto flex-col gap-4 my-16">
				<div className="container flex justify-between w-full mx-auto">
					<h1 className="text-4xl font-bold text-center text-gray-900">
						Employees
					</h1>

					<AddButton
						handleClick={() => {
							setModifyEmployee(null)
							onOpenChange()
						}}
						label="Ajouter un employé"
					/>
				</div>

				<Table
					aria-label="Example table with static content"
					className="bg-neutral-50"
					shadow="none"
				>
					<TableHeader>
						<TableColumn>Nom</TableColumn>
						<TableColumn>Type</TableColumn>
						<TableColumn>Salaire</TableColumn>
						<TableColumn>Date de début</TableColumn>
						<TableColumn>Date de fin</TableColumn>
						<TableColumn>Scenario</TableColumn>
						<TableColumn className="w-32">Action</TableColumn>
					</TableHeader>
					<TableBody>
						{employees.map((employee) => (
							<TableRow key={employee.id} className={styleTableRow()}>
								<TableCell className={styleTableCell()}>
									{employee.nom}
								</TableCell>
								<TableCell className={styleTableCell()}>
									{employee.type}
								</TableCell>
								<TableCell className={styleTableCell()}>
									{employee.salaire}
								</TableCell>
								<TableCell className={styleTableCell()}>
									{employee.dateDebut}
								</TableCell>
								<TableCell className={styleTableCell()}>
									{employee.dateFin}
								</TableCell>
								<TableCell className={styleTableCell()}>
									{employee.scenario}
								</TableCell>
								<TableCell className={styleTableCell()}>
									<div className="flex flex-row gap-2">
										<BaseButton
											color="primary"
											variant="light"
											onPress={() => {
												setModifyEmployee(employee)
												onOpenChange()
											}}
										>
											Modifier
										</BaseButton>
										<Button
											color="danger"
											onPress={() => {
												deleteEmployee(employee.id)
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
							<ModalHeader>
								<div className="text-2xl font-bold text-center text-gray-900">
									{modifyEmployee ? "Modifier" : "Ajouter"} un employé
								</div>
							</ModalHeader>
							<ModalBody>
								<FText
									name="nom"
									label="Nom"
									placeholder="Entrez le nom de l'employé"
								/>
								<FNumber name="salaire" label="Salaire" placeholder="Salaire" />
								<FSelect
									name="type"
									label="Type"
									placeholder="Type"
									options={[
										{ label: "CDI", value: "CDI" },
										{ label: "Alternance", value: "Alternance" },
										{ label: "Stage", value: "Stage" },
										{ label: "Gérant", value: "Gérant" },
									]}
								/>
								<FText
									name="dateDebut"
									label="Date de début"
									placeholder="Date de début"
								/>
								<FText
									name="dateFin"
									label="Date de fin"
									placeholder="Date de fin"
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
											if (modifyEmployee) {
												updateEmployee(modifyEmployee.id, data)
											} else {
												createEmployee(data)
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
		</EmployeeContainer>
	)
}

export default EmployeesPage
