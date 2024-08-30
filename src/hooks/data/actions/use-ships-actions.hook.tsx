import useDataActions from "../generic/use-data-action.hook"

const useShipsActions = () => {
	const actions = useDataActions("Ship")
	return {
		deleteShip: actions.deleteData,
		createShip: actions.createData,
		updateShip: actions.updateData,
		fetchShips: actions.fetchData,
	}
}

export default useShipsActions
