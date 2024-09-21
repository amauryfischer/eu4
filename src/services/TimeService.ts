import { RESOURCE_TYPES } from "./ResourcesService"

const RESOURCE_FOR_1_MINUTE = 8_000

const calculateTimeFromResourceCost = (
	cost: Record<RESOURCE_TYPES, number>
) => {
	const totalResources = Object.values(cost).reduce(
		(acc, curr) => acc + curr,
		0
	)
	return totalResources / RESOURCE_FOR_1_MINUTE
}

export default {
	calculateTimeFromResourceCost
}
