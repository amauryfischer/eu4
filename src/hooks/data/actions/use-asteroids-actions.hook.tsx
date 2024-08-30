import useDataActions from "../generic/use-data-action.hook"

const useAsteroidsActions = () => {
	const actions = useDataActions("Asteroid")
	return {
		deleteAsteroid: actions.deleteData,
		createAsteroid: actions.createData,
		updateAsteroid: actions.updateData,
		fetchAsteroids: actions.fetchData,
	}
}

export default useAsteroidsActions
