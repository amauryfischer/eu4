import { RESOURCE_TYPES } from "@/services/ResourcesService"

export const addResources = ({
	resourcesToAdd,
	initialResources,
}: {
	resourcesToAdd: Record<RESOURCE_TYPES, number>
	initialResources: Record<RESOURCE_TYPES, number> | undefined
}) => {
	let newResources = initialResources ?? {}
	Object.keys(resourcesToAdd).forEach((key: RESOURCE_TYPES) => {
		if (!newResources[key]) {
			newResources[key] = 0
		}
		newResources[key] += resourcesToAdd[key]
	})
	return newResources
}
