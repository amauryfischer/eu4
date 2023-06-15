import db from "../db"
import EmployeesPage from "./EmployeesPage"

const Page = async () => {
	const employees = await db.employee.findMany()

	return <EmployeesPage employees={employees} />
}

export default Page
