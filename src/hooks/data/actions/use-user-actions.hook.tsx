import useDataActions from "../generic/use-data-action.hook"

const useUserActions = () => {
	const actions = useDataActions("User")
	return {
		fetchUser: actions.fetchData
	}
}

export default useUserActions
