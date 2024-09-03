import useData from "../data/generic/use-data.hook"
import { User } from "@prisma/client"

const useAllUsers = useData("User") as () => Record<string, User>

const useCurrentUser = () => {
	const users = useAllUsers()
	return Object.values(users)?.[0]
}
export default useCurrentUser
