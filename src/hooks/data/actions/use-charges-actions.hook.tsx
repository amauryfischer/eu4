import { Charge } from "@prisma/client"
import { useTransition } from "react"
import useDataActions from "../generic/use-data-action.hook"

const useChargesActions = () => {
	const actions = useDataActions("Charge")
	return {
		deleteCharge: actions.deleteData,
		createCharge: actions.createData,
		updateCharge: actions.updateData,
		fetchCharge: actions.fetchData,
	}
}

export default useChargesActions
