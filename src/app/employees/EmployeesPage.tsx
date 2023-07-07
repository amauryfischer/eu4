// nextjs
"use client"

import useEmployees from "@/hooks/data/entity/use-employees.hook"
import useColumnsFromSchema from "@/hooks/schema/use-columns-from-schema"
import employeeSchema from "@/schema/employee.schema"
import AddButton from "@/ui/atoms/buttons/AddButton/AddButton"
import ModalSchema from "@/ui/organisms/BModal/ModalSchema/ModalSchema"
import BTable from "@/ui/organisms/Btable/BTable"
import changePrimary from "@/utils/changePrimary"
import { useDisclosure } from "@nextui-org/react"
import { Employee } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import useEmployeesActions from "../../hooks/data/actions/use-employees-actions.hook"
import _ from "lodash"
import buildYupFromSchema from "@/utils/schema/buildYupFromSchema"

const EmployeeContainer = styled.div`
	${changePrimary("blue")}
`

const EmployeesPage = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: false,
	})
	const employees = useEmployees()
	const { fetchEmployees, createEmployee, deleteEmployee, updateEmployee } =
		useEmployeesActions()

	useEffect(() => {
		fetchEmployees()
	}, [])

	const methods = useForm<Employee>()
	const [modifyEmployee, setModifyEmployee] = useState<Employee | null>(null)
	const yupSchema = buildYupFromSchema(employeeSchema)
	useEffect(() => {
		if (!_.isEmpty(modifyEmployee)) {
			methods.reset(modifyEmployee)
		} else {
			methods.reset(yupSchema.getDefault())
		}
	}, [modifyEmployee])

	const columns = useColumnsFromSchema<Employee>({
		schema: employeeSchema,
		editable: true,
		updateAction: updateEmployee,
	})

	const onEditClick = useCallback((employee: Employee) => {
		setModifyEmployee(employee)
		onOpenChange()
	}, [])

	const onDeleteClick = useCallback((employee: Employee) => {
		deleteEmployee(employee.id)
	}, [])

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

				<BTable
					columns={columns}
					data={Object.values(employees ?? {})}
					onEditClick={onEditClick}
					onDeleteClick={onDeleteClick}
				/>

				<ModalSchema
					schema={employeeSchema}
					initialData={modifyEmployee}
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					update={updateEmployee}
					create={createEmployee}
				/>
			</div>
		</EmployeeContainer>
	)
}

export default EmployeesPage
