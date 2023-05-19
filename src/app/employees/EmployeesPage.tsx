"use client"

import FNumber from "@/ui/molecules/FNumber"
import FText from "@/ui/molecules/FText"
import { Button, Modal, Table, useModal } from "@nextui-org/react"
import { Employee } from "@prisma/client"
import { FormProvider, useForm } from "react-hook-form"
import db from "../db"
import { useEffect, useState, useTransition } from "react"
import useEmployeesActions from "./use-employees-actions.hook"
import styled from "styled-components"
import CancelButton from "@/ui/atoms/buttons/CancelButton/CancelButton"
import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import SaveButton from "@/ui/atoms/buttons/SaveButton/SaveButton"
import FSelect from "@/ui/molecules/FSelect"

const EmployeeContainer = styled.div`
  --primary: var(--blue);
  --primary-hue: var(--blue-hue);
  --primary-saturation: var(--blue-saturation);
  --primary-lightness: var(--blue-lightness);
  --primary-text-color: var(--blue-text-color);
  --primary50: var(--blue50);
  --primary50-lightness: var(--blue50-lightness);
  --primary100: var(--blue100);
  --primary100-lightness: var(--blue100-lightness);
  --primary200: var(--blue200);
  --primary200-lightness: var(--blue200-lightness);
  --primary300: var(--blue300);
  --primary300-lightness: var(--blue300-lightness);
  --primary400: var(--blue400);
  --primary400-lightness: var(--blue400-lightness);
  --primary500: var(--blue500);
  --primary500-lightness: var(--blue500-lightness);
  --primary600: var(--blue600);
  --primary600-lightness: var(--blue600-lightness);
  --primary700: var(--blue700);
  --primary700-lightness: var(--blue700-lightness);
  --primary800: var(--blue800);
  --primary800-lightness: var(--blue800-lightness);
  --primary900: var(--blue900);
  --primary900-lightness: var(--blue900-lightness);
`

const EmployeesPage = ({ employees }: { employees: Employee[] }) => {
	const { setVisible, bindings } = useModal()
	let [isPending, startTransition] = useTransition()
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
							setVisible(true)
						}}
						label="Ajouter un employé"
					/>
				</div>

				<Table
					aria-label="Example table with static content"
					css={{
						height: "auto",
						minWidth: "100%",
					}}
				>
					<Table.Header>
						<Table.Column>ID</Table.Column>
						<Table.Column>Nom</Table.Column>
						<Table.Column>Type</Table.Column>
						<Table.Column>Salaire</Table.Column>
						<Table.Column>Action</Table.Column>
					</Table.Header>
					<Table.Body>
						{employees.map((employee) => (
							<Table.Row key={employee.id}>
								<Table.Cell>{employee.id}</Table.Cell>
								<Table.Cell>{employee.nom}</Table.Cell>
								<Table.Cell>{employee.type}</Table.Cell>
								<Table.Cell>{employee.salaire}</Table.Cell>
								<Table.Cell>
									<div className="flex flex-row gap-2">
										<Button
											color="primary"
											auto
											ghost
											onClick={() => {
												setModifyEmployee(employee)
												setVisible(true)
											}}
										>
											Modifier
										</Button>
										<Button
											color="error"
											auto
											ghost
											onClick={() => {
												deleteEmployee(employee.id)
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
					<Modal scroll {...bindings}>
						<Modal.Header>
							<div className="text-2xl font-bold text-center text-gray-900">
								{modifyEmployee ? "Modifier" : "Ajouter"} un employé
							</div>
						</Modal.Header>
						<Modal.Body>
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
						</Modal.Body>
						<Modal.Footer>
							<CancelButton handleClick={() => setVisible(false)} />

							<SaveButton
								handleClick={() => {
									methods.handleSubmit((data) => {
										if (modifyEmployee) {
											updateEmployee(modifyEmployee.id, data)
										} else {
											createEmployee(data)
										}
									})()
									return setVisible(false)
								}}
							/>
						</Modal.Footer>
					</Modal>
				</FormProvider>
			</div>
		</EmployeeContainer>
	)
}

export default EmployeesPage
