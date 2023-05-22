import db from "../db"
import { Coda } from "coda-js"
import ChargesFixesPage from "./ChargesFixesPage"
import { data } from "autoprefixer"

const Page = async () => {
	const charges = await db.charge.findMany()

	return <ChargesFixesPage charges={charges} />
}

export default Page
