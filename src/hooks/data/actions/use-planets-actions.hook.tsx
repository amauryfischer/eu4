import useDataActions from "../generic/use-data-action.hook"

const usePlanetsActions = () => {
	const actions = useDataActions("Planet")
	return {
		deletePlanet: actions.deleteData,
		createPlanet: actions.createData,
		updatePlanet: actions.updateData,
		fetchPlanets: actions.fetchData,
	}
}

export default usePlanetsActions
