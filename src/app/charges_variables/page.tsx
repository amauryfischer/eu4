import db from "../db"
import ChargesVariablesPage from "./ChargesVariablesPage"

const Page = async () => {
	const charges = await db.charge.findMany()
	return <ChargesVariablesPage charges={charges} />
}

export default Page
