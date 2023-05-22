import {
	createChargeAction,
	deleteChargeAction,
	updateChargeAction,
} from "@/actions/data/chargeActions"
import { Charge } from "@prisma/client"
import { useTransition } from "react"

const useChargesActions = () => {
	const [_isPending, startTransition] = useTransition()

	const deleteCharge = async (id: string) => {
		startTransition(async () => {
			deleteChargeAction(id)
		})
	}
	const createCharge = async (data: Omit<Charge, "id">) => {
		startTransition(async () => {
			createChargeAction(data)
		})
	}
	const updateCharge = async (id: string, data: Charge) => {
		startTransition(async () => {
			updateChargeAction(id, data)
		})
	}

	return {
		deleteCharge,
		createCharge,
		updateCharge,
	}
}

export default useChargesActions