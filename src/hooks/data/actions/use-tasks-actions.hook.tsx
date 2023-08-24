import useDataActions from "../generic/use-data-action.hook"

const useTasksActions = () => {
	const actions = useDataActions("Task")
	return {
		deleteTask: actions.deleteData,
		createTask: actions.createData,
		updateTask: actions.updateData,
		fetchTasks: actions.fetchData,
	}
}

export default useTasksActions
