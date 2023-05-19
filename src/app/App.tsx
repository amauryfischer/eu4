import Link from "next/link"
import db from "./db"
const App = async () => {
	const employees = await db.employee.findMany()
	return (
		<div className="container flex">
			<h1>Home</h1>
			{employees.map((employee) => (
				<div key={employee.id}>
					<h2>{employee.nom}</h2>
					<p>{employee.salaire}</p>
				</div>
			))}
			<Link href="/employees">coucou</Link>
		</div>
	)
}

export default App as unknown as React.FC
