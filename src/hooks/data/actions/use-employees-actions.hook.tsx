import useDataActions from "../generic/use-data-action.hook"

const useEmployeesActions = () => {
	const actions = useDataActions("Employee")
	return {
		deleteEmployee: actions.deleteData,
		createEmployee: actions.createData,
		updateEmployee: actions.updateData,
		fetchEmployees: actions.fetchData,
	}
}

export default useEmployeesActions
