import { RESOURCE_TYPES } from "@/services/ResourcesService"

export const fetchRandomResources = ({
	resources,
	amount,
}: { resources: Record<RESOURCE_TYPES, number>; amount: number }) => {
	const resourceKeys = Object.keys(resources) as RESOURCE_TYPES[]
	const totalResources = resourceKeys.length

	let randomResources = {} as Record<RESOURCE_TYPES, number>
	let remainingResources = {} as Record<RESOURCE_TYPES, number>

	let remainingAmount = amount

	resourceKeys.forEach((key) => {
		const randomQuantity = Math.min(
			Math.floor(remainingAmount / totalResources),
			resources[key],
		)
		randomResources[key] = randomQuantity
		remainingAmount -= randomQuantity

		if (resources[key] - randomQuantity > 0) {
			remainingResources[key] = resources[key] - randomQuantity
		}
	})

	return { randomResources, remainingResources }
}
