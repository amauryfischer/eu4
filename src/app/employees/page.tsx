import FNumber from "@/ui/molecules/FNumber"
import FText from "@/ui/molecules/FText"
import { Button, Modal, useModal } from "@nextui-org/react"
import { Employee } from "@prisma/client"
import { FormProvider, useForm } from "react-hook-form"
import EmployeesPage from "./EmployeesPage"
import db from "../db"

const Page = async () => {
	const employees = await db.employee.findMany()

	return <EmployeesPage employees={employees} />
}

export default Page
