import useDataActions from "../generic/use-data-action.hook"

const useFleetsActions = () => {
	const actions = useDataActions("Fleet")
	return {
		deleteFleet: actions.deleteData,
		createFleet: actions.createData,
		updateFleet: actions.updateData,
		fetchFleets: actions.fetchData,
	}
}

export default useFleetsActions
